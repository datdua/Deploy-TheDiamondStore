import axios from "axios";

export const getAllCertificates = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get("http://localhost:8080/api/certificates/get-all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
};

export const getCertificateById = async (certificateId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/certificates/${certificateId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate by ID:", error);
    throw error;
  }
};

export const createCertificate = async (certificate) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      "http://localhost:8080/api/certificates/manager/create",
      certificate,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
};

export const updateCertificate = async (certificateId, certificate) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.put(
      `http://localhost:8080/api/certificates/manager/update/${certificateId}`,
      certificate,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error;
  }
};


export async function deleteCertificate(certificateIDs) {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.delete("http://localhost:8080/api/certificates/manager/delete", 
      { 
        headers: { Authorization: `Bearer ${token}` },
        data: certificateIDs
       }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete accounts");
  }
}

export const getCertificateImage = async (certificationID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/certificates/get/certificateImg/${certificationID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate image:", error);
    throw error;
  }
};

export const getCertificateByPage = async (page = 1, size = 9) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/certificates/paged?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate by page:", error);
    throw error;
  }
};
