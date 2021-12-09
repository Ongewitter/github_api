export default async function fetchGet({ url, success, fail }) {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      response.json()
              .then(data => success(data));
    }, response => {
      response.json()
              .then(error => fail(error.message));
    });
}
