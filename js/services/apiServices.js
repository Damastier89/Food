export async function postData(url, data) {
  // Данный код асенхронный , ответ может придти не сразу и в переменную 
  // res запишется null или undefined. Для этого успользуем async/await
  // и он будет дожидаться результата запроса
  const res = await fetch(url, { 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  })

  return await res.json();
};

export async function getData(url) {
  // Данный код асенхронный , ответ может придти не сразу и в переменную 
  // res запишется null или undefined. Для этого успользуем async/await
  // и он будет дожидаться результата запроса
  const request = await fetch(url);

  if (!request.ok) {
    // выкидываем ошибку если ответ не OK
    throw new Error(`Could not fetch ${url}, status: ${request.status}`); 
  };

  return await request.json();
};
