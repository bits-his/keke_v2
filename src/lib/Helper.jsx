import { useLocation } from "react-router-dom";
// old karota new is keke-api dont use this one
// export const server_url = "https://galaxybis.ebudgetkano.ng/karota";
// export const server_url = 'https://hotelserver-production.up.railway.app'
// export const server_url = 'http://localhost:34568'
//  export const server_url = "http://localhost:44405";
// export const server_url = "http://192.168.43.123:44405"
export const server_url = "http://localhost:44405";
// export const server_url = "http://62.72.0.209:3001";
// export const server_url = "https://galaxybis.ebudgetkano.ng/keke-api";

export const _post = (url, data, success = (f) => f, error = (f) => f) => {
  const token = localStorage.getItem("@@token");
  fetch(`${server_url}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((raw) => raw.json())
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};
export const _get = (url, success = (f) => f, error = (f) => f) => {
  fetch(`${server_url}/${url}`)
    .then((raw) => raw.json())
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export const _put = (url, data, success = (f) => f, error = (f) => f) => {
  fetch(`${server_url}/${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((raw) => raw.json())
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default useQuery;

export function toParagraph(text) {
  if (text) {
    // Split the text into paragraphs
    let paragraphs = text.split("\n");

    // Capitalize the first letter of each paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      // Trim the paragraph to remove any leading/trailing whitespace
      paragraphs[i] = paragraphs[i].trim();

      // Capitalize the first letter
      if (paragraphs[i].length > 0) {
        paragraphs[i] = paragraphs[i][0].toUpperCase() + paragraphs[i].slice(1);
      }
    }

    // Join the paragraphs back together
    return paragraphs.join("\n");
  }
}

export function formatNumber1(n) {
  let num = Math.round(parseInt(n), 0);
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return "0";
  }
}

export function formatNumber(n = 0) {
  if (typeof n !== "number" && typeof n !== "string") {
    return "0";
  }

  // Convert n to a number if it's a string and round it to a certain number of decimal places
  n = parseFloat(n);

  if (isNaN(n)) {
    return "0";
  }

  // Format the number with commas for thousands and round it to two decimal places
  const formattedNumber = n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
}

export const separator = (num) => {
  const x = Number(num);
  return x.toLocaleString("en-US");
};
