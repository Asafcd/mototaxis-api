const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const createReport = async (body) => {
  try {
    const res = await db.collection('ButtonReports').add(body)
    return {status: true, data: res};
  } catch (error) {
    throw { status: 500, error};
  }
};

const getReports = async () => {
  try {
    const reports = await db.collection('ButtonReports').get();
    return {status: true, data: reports}
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getReport = async (id) => {
  try {
    const reportRef = db.collection('ButtonReports').doc(id)
    const report = await reportRef.get()

    if(report.exists){ return {status:true, data: report.data()}}
    else{return {status: false, data:"No such document"}}
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateReport = async(id, body) => {
  try {
    const reportRef = db.collection('ButtonReports').doc(id)
    await reportRef.update(body)
    const updatedReport = await reportRef.get()
    return {status: true, data: updatedReport.data()}
  } catch (error) {
    throw { status: error.status||500, error: error };
  }
};

const deleteReport = async(id) => {
  try {
    const reportRef = db.collection('ButtonReports').doc(id)
    await reportRef.delete()

    return {status: true, data: `${id} deleted succesfully` }
    
  } catch (error) {
    throw { status: 500, error: error || 'Service method error' };
  }
};

module.exports = {
  createReport,
  getReport,
  getReports,
  updateReport,
  deleteReport,
};