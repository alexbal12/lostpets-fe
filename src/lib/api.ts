const API_BASE_URL = "https://df-lost-pets.herokuapp.com";

export async function fetchNearbyPets(lat: any, long: any) {
  const pets = await fetch(`${API_BASE_URL}/pets?lat=${lat}&lng=${long}`, {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });

  return pets.json();
}
export async function fetchReportData(
  userEmail,
  reporterName,
  phoneNumber,
  message,
  petName
) {
  const resultado = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userEmail,
      reporterName,
      phoneNumber,
      message,
      petName,
    }),
  });

  return resultado.json();
}
export async function fetchCheckUser(email: any) {
  const user = await fetch(`${API_BASE_URL}/users/search?email=${email}`, {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });

  return user.json();
}
export async function fetchAuthToken(email: any, password: any) {
  const token = await fetch(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return token.json();
}
export async function fetchMyPets(token: string) {
  const pets = await fetch(`${API_BASE_URL}/me/pets`, {
    method: "get",
    headers: {
      Authorization: "bearer " + token,
    },
  });

  return pets.json();
}
export async function fetchDataUser(token: string) {
  const user = await fetch(`${API_BASE_URL}/me`, {
    method: "get",
    headers: {
      Authorization: "bearer " + token,
    },
  });

  return user.json();
}
export async function fetchUpdateUser(fullname, password, email) {
  console.log(password, "password");
  console.log(email, "email");
  console.log(fullname, "user");
  const respuesta = await fetch(`${API_BASE_URL}/users/update`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fullname,
      password,
      email,
    }),
  });

  return respuesta.json();
}
