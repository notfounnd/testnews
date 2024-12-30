'use strict';

function status(request, response) {
  return response.status(200).json({ message: 'Hello API!' });
}

export default status;
