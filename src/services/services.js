const URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

console.log(URL);

export const fetchNumerologyDetails = async (payload) => {
  try {
    const response = await fetch(`${URL}/utilities/numeroReport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch numerology data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(errorData.message || "Failed to fetch numerology data");
  }
};

export const fetchBirthDetails = async (payload) => {
  try {
    const response = await fetch(`${URL}/utilities/birthReport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to fetch birth report");

    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(errorData.message || "Failed to fetch birth report");
  }
};

export const getZodiacs = async () => {
  const response = await fetch(`${URL}/utilities/meta/zodiacs`);
  if (!response.ok) throw new Error("Failed to fetch zodiacs");
  return response.json();
};

export const getDays = async () => {
  const response = await fetch(`${URL}/utilities/meta/days`);
  if (!response.ok) throw new Error("Failed to fetch days");
  return response.json();
};

export const getZodiacReport = async (date, zodiac) => {
  const response = await fetch(
    `${URL}/utilities/zodiacReport?day=${date}&zodiac=${zodiac}`
  );
  if (!response.ok) throw new Error("Failed to fetch main data");
  return response.json();
};

export const searchCities = async (query) => {
  const response = await fetch(
    `${URL}/utilities/cities/search?target=${query}`
  );
  if (!response.ok) throw new Error("Failed to fetch cities");
  return response.json();
};

export const getKalsarpReport = async (payload) => {
  const response = await fetch(`${URL}/utilities/kalsarpReport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Failed to submit form");
  return response.json();
};

export const fetchAstrologersAPI = async (filters) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    const response = await fetch(`${URL}/customer/astrologers/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch astrologers");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error in fetchAstrologersAPI:", error);
    return null;
  }
};
export const fetchSingleAstrologerAPI = async (id) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    let url = `${URL}/customer/astrologers/search`;
    if (id) {
      url += `/${id}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch astrologers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchAstrologersAPI:", error);
    return null;
  }
};

export const fetchAstrologersAPIPublic = async (filters) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    const response = await fetch(`${URL}/metadata/astrologers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch astrologers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchAstrologersAPIPublic:", error);
    return null;
  }
};

export const fetchTransactionsAPI = async (token, { pageNo, pageSize }) => {
  try {
    const response = await fetch(`${URL}/customer/payments/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageNo,
        pageSize,
        statuses: ["SUCCESS", "FAILED"],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchTransactionsAPI:", error);
    return null;
  }
};

export const fetchMetadataFiltersAPI = async (token) => {
  try {
    const response = await fetch(`${URL}/metadata/filters`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchMetadataFiltersAPI:", error);
    return null;
  }
};

export const fetchStates = async (token) => {
  try {
    const response = await fetch(`${URL}/metadata/states`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchMetadataFiltersAPI:", error);
    return null;
  }
};

export const fetchPoojaDataAPI = async () => {
  try {
    const response = await fetch(`${URL}/utilities/meta/poojas`);

    if (!response.ok) {
      throw new Error("Failed to fetch pooja data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchPoojaDataAPI:", error);
    return null;
  }
};

export const updateCustomer = async (formData) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  try {
    let parts = formData.BirthDate.split("-");
    let dob = "1990-10-19";
    if (parts.length === 3) {
      dob = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    let birthTime = formData.BirthTime;
    const userGender = formData.Gender.toUpperCase();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customer`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: `${formData.FullName}`,
          email: `${formData.email}`,
          birthDate: dob,
          cityId: `${formData.cityId}`,
          birthTime: birthTime + ":am",
          userGender: userGender,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchOrdersAPI = async (authToken, currentPage) => {
  const response = await fetch(`${URL}/customer/consultations/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      pageNo: currentPage,
      pageSize: 4,
      statuses: ["ONGOING", "COMPLETED"],
      modes: ["CALL", "CHAT"],
    }),
  });

  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
};

export const submitFeedbackAPI = async (authToken, orderId, feedbackData) => {
  const response = await fetch(
    `${URL}/customer/consultations/${orderId}/feedback`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(feedbackData),
    }
  );

  if (!response.ok) throw new Error("Failed to submit feedback");
  if (response.status === 204) return null;

  return await response.json();
};

export const sendOTP = async (mobile) => {
  const response = await fetch(`${URL}/sessions/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNo: mobile }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send OTP");
  }

  return await response.json();
};

export const verifyOTP = async (requestId, otp) => {
  const response = await fetch(`${URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requestId, otp }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify OTP");
  }

  return await response.json();
};

export const initiateCall = async (astrologerId, token) => {
  try {
    const response = await fetch(
      `${URL}/customer/consultations/CALL?astrologerId=${astrologerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.msg || "Failed to initiate call");
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const createOrderRazorpay = async (paymentAmount, authToken, state) => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL
      }/customer/payments?amount=${paymentAmount}${
        state ? `&state=${state}` : ""
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const verifyOrderRazorpay = async (
  avorderid,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  authToken
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customer/payments/${avorderid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }),
      }
    );

    if (res.ok) {
      return { isOk: true };
    } else {
      return { isOk: false };
    }
  } catch (error) {
    console.error("Payment verification error:", error);
  }
};

export const fetchUserBalance = async (token) => {
  try {
    // const token = "42948056-9492-49e1-a536-3e5743e6871d";

    const res = await fetch(`${URL}/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch user details");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching balance:", err);
    throw err;
  }
};
