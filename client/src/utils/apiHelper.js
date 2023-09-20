export const api = (path,
                    method = "GET",
                    body = null,
                    credentials = null
                    ) => {
    const url = "http://localhost:5000/api" + path;



    const options = {
        method,
        headers: {}
    };


    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    if (credentials) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`
    }

    return fetch(url, options)
}


/* CREATE AUTHUSER
* const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(user)
    }


    try {
      const response = await fetch("http://localhost:5000/api/users", fetchOptions)
*  */

/* GET AUTH USER
*  const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    };

    const response = await fetch('http://localhost:5000/api/users', fetchOptions)
* */