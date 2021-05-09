const bluebird = require('bluebird');
// const moment = require('moment');
const { ObjectId } = require('mongodb');
const Product = require('./productModel');

const getCollection = () => global.Mongo.collection('products');
const getCache = () => global.sdk.cache.namespace('products');

function createModel(properties) {
  return new Product(properties);
}

function normalizeMongoObject(mongoObject) {
  const doc = { ...mongoObject };

  // fix id
  doc.id = String(doc._id);
  delete doc._id;
  return doc;
}

// methods
module.exports = {
  getCollection,
  getCache,
  createModel: createModel,

  findOneById: bluebird.method((id) =>
    getCache().wrap(String(id), async () => {
      const safeId = typeof id === 'object' ? id : ObjectId(id);
      const doc = await getCollection().findOne({ _id: safeId, deletedAt: null });

      if (doc) {
        return normalizeMongoObject(doc);
      }

      throw (`${id} not found!`);
    }),
  ),

  async insertOne(properties) {

    const content = await createModel({
      ...properties
    }).validate();

    const { insertedId } = await getCollection().insertOne({
      ...content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deletedAt: null,
    });

    // // flush and get fresh
    const created = await module.exports.findOneById(String(insertedId));
    return created;
  },

  async updateOne(id, properties) {

    const old = await module.exports.findOneById(id);
    const content = createModel({
      ...old,
      ...properties,
      id: undefined,
    });

    const idString = String(id);

    const updated = await getCollection().findOneAndUpdate(
      { _id: ObjectId(idString), deletedAt: null },
      {
        $set: {
          ...content,
          updatedAt: Date.now(),
        },
      },
      { returnNewDocument: true },
    );


    // // flush and get fresh
    await getCache().del(String(updated.value._id));
    return module.exports.findOneById(idString);
  },

  async deleteOne(id) {
    const idString = String(id);
    const updated = await getCollection().findOneAndUpdate(
      { _id: ObjectId(idString), deletedAt: null },
      {
        $set: {
          deletedAt: Date.now(),
        },
      },
    );

    if (!updated.value) {
      throw (`Id ${id} has been deleted`)
    }

    // flush and get fresh
    await getCache().del(String(updated.value._id));
    return module.exports.findOneById(idString);
  },

  async findAll(query) {

    let { sort, sortType, first, skip, } = query;


    if (!first || first > 100) first = 100;
    if (!skip) skip = 0;

    if (!sort) sort = "createdAt"

    if (sortType === "ASC" || !sortType) {
      sortType = 1
    } else {
      sortType = -1
    }


    let sortParam = {}
    sortParam[sort] = sortType


    return new Promise((resolve, reject) => {
      getCollection()
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(first))
        .sort(sortParam)
        .toArray((err, docs) => {
          if (err) return reject(err);

          return resolve(docs);
        });
    });
  }

};
