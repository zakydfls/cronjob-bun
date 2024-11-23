const sendToAPI = async (url: string, secret: string, payload: Object, method: string = "POST") => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${secret}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Berhasil:", responseData);
    })
    .catch((error) => {
      console.error("Gagal:", error);
    });
};

export { sendToAPI };
