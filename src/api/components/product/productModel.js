const yup = require('yup');

/*
 Model: Product
 Class: implement old function style
 Description: schema for this object "document"
*/

// describe schema, using something like yup is really helpful

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  price: yup.number().required(),
  descriptions: yup.string().min(3).required()
});

module.exports = class MainBanner {
  constructor(properties) {
    Object.assign(this, properties || {});
  }

  async validate() {
    Object.assign(
      this,
      await schema.validate(this, {
        stripUnknown: true,
      }),
    );

    // NOTE: Returning this for chaining
    return this;
  }
};
