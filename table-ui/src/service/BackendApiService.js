import axios from 'axios';

const baseURL = 'http://localhost:8080';
const apiUrl = `${baseURL}/note`;

class APIService {
  static getNotes() {
    return axios.get(apiUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  static saveNote(noteText) {
    return axios.post(apiUrl, {"noteText": noteText})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  static updateNote(id, noteText) {
    return axios.put(`${apiUrl}/${id}`, {"noteText": noteText})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  static getNote(id) {
    return axios.get(`${apiUrl}/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  static deleteNote(id) {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}

export default APIService;