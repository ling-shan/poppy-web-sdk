/* eslint-disable @typescript-eslint/no-explicit-any */

export function is404Error(error: any) {
  if (!error) {
    return false;
  }

  if (error.name !== 'AxiosError') {
    return false;
  }

  if (error.response?.status !== 404) {
    return false;
  }

  return true;
}

export function is403Error(error: any) {
  if (!error) {
    return false;
  }

  if (error.name !== 'AxiosError') {
    return false;
  }

  if (error.response?.status !== 403) {
    return false;
  }

  return true;
}

export function is401Error(error: any) {
  if (!error) {
    return false;
  }

  if (error.name !== 'AxiosError') {
    return false;
  }

  if (error.response?.status !== 401) {
    return false;
  }

  return true;
}
