/**
 * Set cookie
 * @param name 
 * @param value 
 * @param hours 
 */
export function setCookie(name: string, value: string, hours: number) {
  // Encode value in order to escape semicolons, commas, and whitespace
  let cookie = name + "=" + encodeURIComponent(value);

  if (typeof hours === "number") {
    /* Sets the max-age attribute so that the cookie expires
    after the specified number of days */
    cookie += "; max-age=" + (hours * 3600);

    document.cookie = cookie;
  }
}

/**
 * Get cookie
 * @param name 
 * @returns 
 */
export function getCookie(name: string) {
  // Split cookie string and get all individual name=value pairs in an array
  let cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
    and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}