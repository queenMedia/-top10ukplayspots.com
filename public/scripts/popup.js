function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function getCookie(name) {
  const cookieName = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

function verifyAge(isAdult) {
  if (isAdult) {
    document.getElementById('ageVerification').style.display = 'none';
    setCookie('top10ukplayspots.com_age', 'true', 2);
  } else {
    window.location.href = 'https://www.google.com';
  }
}

window.onload = function () {
  const ageVerified = getCookie('top10ukplayspots.com_age');
  if (ageVerified !== 'true') {
    const modal = document.getElementById('ageVerification');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  }
};
