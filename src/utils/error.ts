/* eslint-disable @typescript-eslint/no-explicit-any */

export function is404Error(error: any) {
  if (!error) {
    return false;
  }

  if (error.name === 'notfound') {
    return true;
  }

  if (error.name !== 'AxiosError') {
    return false;
  }

  if (error.response?.status !== 404) {
    return false;
  }

  return true;
}

export function create404Error() {
  return new Error('notfound');
}

export function is403Error(error: any) {
  if (!error) {
    return false;
  }

  if (error.name === 'noPermission') {
    return true;
  }

  if (error.name !== 'AxiosError') {
    return false;
  }

  if (error.response?.status !== 403) {
    return false;
  }

  return true;
}

export function create403Error() {
  return new Error('noPermission');
}

export function is401Error(error: any) {
  if (!error) {
    return false;
  }

  if (error.name === 'invalidAuth') {
    return true;
  }

  if (error.name !== 'AxiosError') {
    return false;
  }

  if (error.response?.status !== 401) {
    return false;
  }

  return true;
}

export function create401Error() {
  return new Error('invalidAuth');
}
