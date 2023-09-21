const config = require("../config");
const fastify = require("../server");

let app = fastify;

exports.get_request = async (data) => {
  return await app.inject({
    method: 'GET',
    url: `${config.app.apiPath}${data.endpoint}`,
  })
};

exports.get_request_with_authorization = async (data) => {
  return await app.inject({
    method: 'GET',
    url: `${config.app.apiPath}${data.endpoint}`,
    query: data.queryParams,
    headers:{authorization: `Bearer ${data.token}`},
  })
};

exports.post_request = async (data) => {
  try {
    return app.inject({
      method: 'POST',
      url: `${config.app.apiPath}${data.endpoint}`,
      payload: data.body,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.post_request_with_authorization = async (data) => {
  try {
    const dirname = __dirname;
    if (data.fileupload) {
      if (data.fileupload === 2) {
        return app.inject({
          method: 'POST',
          url: `${config.app.apiPath}${data.endpoint}`,
          headers: {
            authorization: `Bearer ${data.token}`,
          },
          payload: data.params,
          files: [
            {
              name: data.params.file_key || 'file',
              filename: `${dirname}/assets/${data.params.file_path || 'test.bin'}`,
            },
            // Add more files if needed
          ],
        });
      } else {
        return app.inject({
          method: 'POST',
          url: `${config.app.apiPath}${data.endpoint}`,
          headers: {
            authorization: `Bearer ${data.token}`,
          },
          payload: data.params,
          files: [
            {
              name: data.params.file_key || 'file',
              filename: `${dirname}/assets/${data.params.file_path || 'test.bin'}`,
            },
          ],
        });
      }
    } else {
      return app.inject({
        method: 'POST',
        url: `${config.app.apiPath}${data.endpoint}`,
        headers: {
          authorization: `Bearer ${data.token}` || '',
        },
        payload: data.body,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.put_request = async (data) => {
  try {
    return app.inject({
      method: 'PUT',
      url: `${config.app.apiPath}${data.endpoint}`,
      payload: data.body,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.put_request_with_authorization = async (data) => {
  try {
    const dirname = __dirname;

    if (data.fileupload) {
      return app.inject({
        method: 'PUT',
        url: `${config.app.apiPath}${data.endpoint}`,
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        payload: data.params,
        files: [
          {
            name: data.params.file_key || 'file',
            filename: `${dirname}/assets/${data.params.file_path || 'test.bin'}`,
          },
        ],
      });
    } else {
      return app.inject({
        method: 'PUT',
        url: `${config.app.apiPath}${data.endpoint}`,
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        payload: data.params,
      });
    }
  } catch (error) {
    console.error(error);
  }
};


exports.delete_request = async (data) => {
  try {
    return app.inject({
      method: 'DELETE',
      url: `${config.app.apiPath}${data.endpoint}`,
      payload: data.params,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.delete_request_with_authorization = async (data) => {
  try {
    return app.inject({
      method: 'DELETE',
      url: `${config.app.apiPath}${data.endpoint}`,
      headers: {
        authorization: `Bearer ${data.token}`,
      },
      payload: data.params,
    });
  } catch (error) {
    console.error(error);
  }
}