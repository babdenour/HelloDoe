'use strict';

import Config from '@/config';
import axios from 'axios';
import ls from '../../../../utils/localStorage';

const guard = (to, from, next) => {
  let token = ls.getItem('token');
  if (token === null) return next({ name: 'AdminLoginPage' });

  axios({
    url: `${Config.API_ENDPOINT_USERS}check-token`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { token },
  })
    .then((response) => {
      let data = response.data;
      if (!data.success) next({ name: 'AdminLoginPage' });
      else next();
    })
    .catch(() => {
      next({ name: 'AdminLoginPage' });
    });
};

export default guard;
