import axios from "axios";

export const getAllCertificates = async () => {
  try {
    const response = await axios.get("https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/certificates");
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
};

export const getCertificateById = async (certificateId) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/certificates/${certificateId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate by ID:", error);
    throw error;
  }
};

export const createCertificate = async (certificate) => {
  try {
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/certificates/create",
      certificate
    );
    return response.data;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
};

export const updateCertificate = async (certificateId, certificate) => {
  try {
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/certificates/update/${certificateId}`,
      certificate
    );
    return response.data;
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error;
  }
};

export async function deleteCertificate(certificateIDs) {
  try {
    const response = await axios.delete("https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/delete", {
      data: certificateIDs,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete accounts");
  }
}

export const getCertificateImage = async (certificationID) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/certificates/get/certificateImg/${certificationID}`
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/certificates/paged?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate by page:", error);
    throw error;
  }
};
