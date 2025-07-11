// import React, { useState, useEffect } from 'react';
// import { X, Calendar, Building, FileText, Briefcase, AlertTriangle, Link } from 'lucide-react';
// import { Job, JobStatus } from '../types';
// // import { DuplicateCheckResult } from '../utils/duplicateDetection';
// // import { useNavigate, useParams } from 'react-router-dom';
// interface JobFormProps {
//   job?: Job | null;
//   onSubmit: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => { success: boolean; duplicateCheck: DuplicateCheckResult };
//   onCancel: () => void;
// }

// const JobForm: React.FC<JobFormProps> = ({ job, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     companyName: '',
//     jobDescription: '',
//     joblink: '',
//     dateApplied: new Date().toISOString().split('T')[0],
//     status: 'saved' as JobStatus,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);


//   // useEffect(() => {
//   //   if (job) {
//   //     setFormData({
//   //       jobTitle: job.jobTitle,
//   //       companyName: job.companyName,
//   //       jobDescription: job.jobDescription,
//   //       dateApplied: job.dateApplied,
        
//   //       joblink: job.joblink || '',
//   //     });
//   //   }
//   // }, [job]);
//   async function saveJobToDB() : Promise<void> {
//     try {
//       let jobDetails = {
//         jobTitle: formData.jobTitle,
//         companyName: formData.companyName,
//         jobDescription: formData.jobDescription,
//         dateApplied: formData.dateApplied,
//         joblink: formData.joblink,
//         status: formData.status,
//       };
//       let reqToServer  = await fetch(`http://localhost:8086/api/jobs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         jobDetails: {

//         },
//       })})
//         let responseFromServer = await reqToServer.json();
//         consolele.log(responseFromServer);

      
//     } catch (error) {
      
//     }
    
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.jobTitle.trim() || !formData.companyName.trim()) {
//       return;
//     }

//     setIsSubmitting(true);
//     // setDuplicateWarning(null);

//     try {
//       const result = onSubmit(formData);
      
//       if (!result.success && result.duplicateCheck.isDuplicate) {
//         setDuplicateWarning(result.duplicateCheck.message || 'This job already exists');
//         setIsSubmitting(false);
//         saveJobToDB();
//         return;
//       }

//       // Success - form will be closed by parent component
//     } catch (error) {
//       console.error('Error submitting job:', error);
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
    
//     // Clear duplicate warning when user modifies the form
//     if (duplicateWarning) {
//       setDuplicateWarning(null);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-semibold text-gray-900">
//           {job ? 'Edit Job Application' : 'Add New Job Application'}
//         </h3>
//         <button
//           onClick={onCancel}
//           className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Duplicate Warning */}
//       {duplicateWarning && (
//         <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
//           <div className="flex items-start space-x-3">
//             <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
//             <div>
//               <h4 className="text-amber-900 font-medium">Duplicate Job Detected</h4>
//               <p className="text-amber-800 text-sm mt-1">{duplicateWarning}</p>
//               <p className="text-amber-700 text-xs mt-2">
//                 Please check your existing applications or modify the job details if this is a different position.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
//               <Briefcase className="w-4 h-4 inline mr-1" />
//               Job jobTitle *
//             </label>
//             <input
//               type="text"
//               id="jobTitle"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="e.g., Senior Software Engineer"
//             />
//           </div>

//           <div>
//             <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
//               <Building className="w-4 h-4 inline mr-1" />
//               companyName *
//             </label>
//             <input
//               type="text"
//               id="companyName"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="e.g., Google"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700 mb-2">
//               <Calendar className="w-4 h-4 inline mr-1" />
//               Date Applied
//             </label>
//             <input
//               type="date"
//               id="dateApplied"
//               name="dateApplied"
//               value={formData.dateApplied}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               <option value="saved">Saved</option>
//               <option value="applied">Applied</option>
//               <option value="interviewing">Interviewing</option>
//               <option value="offer">Offer</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
//             <FileText className="w-4 h-4 inline mr-1" />
//             Job jobDescription
//           </label>
//           <textarea
//             id="jobDescription"
//             name="jobDescription"
//             value={formData.jobDescription}
//             onChange={handleChange}
//             rows={8}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
//             placeholder="Paste the job jobDescription here for AI resume optimization..."
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Adding a job jobDescription helps our AI optimize your resume for better matching
//           </p>
//           <label htmlFor='joblink' className="block text-sm font-medium text-gray-700 mt-4 mb-2">
//             <Link className="w-4 h-4 inline mr-1" />
//             Job Link
//           </label>
//           <input
//             type="url"
//             id="joblink"
//             name="joblink"
//             value={formData.joblink || ''}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             placeholder="https://example.com/job"
//           />
//         </div>

//         <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
//           >
//             {isSubmitting ? 'Checking...' : (job ? 'Update Job' : 'Add Job')}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default JobForm;



import React, { useState, useEffect, useContext } from "react";
import { X, Calendar, Building, FileText, Briefcase, Link } from "lucide-react";
import { Job, JobStatus } from "../types";
import { UserContext } from "../state_management/UserContext";
import { useNavigate } from "react-router-dom";

interface JobFormProps {
  job?: Job | null;
  onCancel: () => void;
  onSuccess?: () => void;
  setUserJobs;
}

const JobForm: React.FC<JobFormProps> = ({ job, onCancel, onSuccess, setUserJobs}) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    joblink: "",
    dateApplied: new Date().toISOString().split("T")[0],
    status: "saved" as JobStatus,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [jobsData, setJobsData] = useState([]);
  const { userDetails, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobDescription: job.jobDescription,
        joblink: job.joblink || "",
        dateApplied: job.dateApplied?.split("T")[0] || new Date().toISOString().split("T")[0],
        status: job.currentStatus,
      });
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleAddJob = async (e: React.FormEvent) => {
    console.log(token, userDetails);
    e.preventDefault();
    if (!formData.jobTitle.trim() || !formData.companyName.trim()) {
      setError("Job Title and Company Name are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const jobDetails = {
        jobID :job ? job.jobID : Date.now().toString(),
        jobTitle: formData.jobTitle?formData.jobTitle : job?.jobTitle,
        companyName: formData.companyName? formData.companyName : job?.companyName,
        jobDescription: formData.jobDescription? formData.jobDescription : job?.jobDescription,
        joblink: formData.joblink? formData.joblink : job?.joblink,
        dateApplied: formData.dateApplied? formData.dateApplied : job?.dateApplied,
        currentStatus: formData.status? formData.status : job?.currentStatus,
        userID: userDetails.email, // Include user details
      };
      const saveJobsToDb = await fetch(`https://dashboardbackend-ijnw.onrender.com/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({jobDetails,userDetails, token}),
      });
      const responseFromServer = await saveJobsToDb.json();
      onCancel();
      console.log(responseFromServer);
      setUserJobs(responseFromServer?.NewJobList);
      if (responseFromServer?.message.length > 0) {
        setUserJobs(responseFromServer?.NewJobList);
        setJobsData(responseFromServer?.NewJobList);
        return;
      }
      else if(responseFromServer.message = 'invalid token please login again'){
        localStorage.clear();
        navigate('/login');
      }
      if (onSuccess) onSuccess();
      onCancel(); // close modal
    } catch (err) {
      console.log(err);
      setError("Failed to save job. Please try again.");
    } finally {
      setIsSubmitting(false);
    
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {job ? "Edit Job Application" : "Add New Job Application"}
        </h3>
        <button
        type="button"
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      <form onSubmit={handleAddJob} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" />
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-1" />
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Google"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date Applied
            </label>
            <input
              type="date"
              id="dateApplied"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="saved">Saved</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offers</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={6}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Paste the job description here"
          />

          <label htmlFor="joblink" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
            <Link className="w-4 h-4 inline mr-1" />
            Job Link
          </label>
          <input
            type="url"
            id="joblink"
            name="joblink"
            value={formData.joblink || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://example.com/job"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            {isSubmitting ? "Saving..." : job ? "Update Job" : "Add Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
