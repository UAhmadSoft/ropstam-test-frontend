import useAsync from './useAsync';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' }
};

export default function useFetch(url, options = {}, dependencies = [], key) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok)
        return res.json().then((json) => {
          // * json is { status : 'success' , user : { id :sadas , name "" , ...}}
          // * if key is user, we have to return json.user
          if (key) {
            // console.log(`{ ...json[key] }`, json[key]);
            return Promise.resolve(json[key]);
          } else return Promise.resolve(json);
        });
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
}
