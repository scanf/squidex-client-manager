/**
 * Functions for handling breaking changes
 */

function compatState(payload) {
  if (typeof (payload.publish) !== 'undefined') {
    return { publish: payload.publish };
  }
  return { publish: true };
}

function compatPayload(payload) {
  const mangle = payload;
  delete mangle.publish;
  let { data } = mangle;

  // Handle payload is not inside of data
  if (!data) {
    data = {};
    const keys = Object.keys(mangle);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      data[`${key}`] = mangle[`${key}`];
    }
  }

  return { requestBody: data };
}

module.exports.compatState = compatState;
module.exports.compatPayload = compatPayload;