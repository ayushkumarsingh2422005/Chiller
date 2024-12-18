import React, { useContext, useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Avatar, 
  Divider, 
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { 
  Phone, 
  Mail, 
  Edit, 
  Save, 
  Cancel,
  Business,
  Description,
  AccountBalance,
  CameraAlt,
  Warning,
  Instagram,
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  Language,
  WhatsApp
} from "@mui/icons-material";
import { OrganizationContext } from "../../context/OrganizationContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function OrganizationAccount() {
  const { organizationData, fetchOrganizationData } = useContext(OrganizationContext);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [socialMediaErrors, setSocialMediaErrors] = useState({});
  const [collegeType, setCollegeType] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  useEffect(() => {
    if (collegeType) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/colleges/all?type=${collegeType}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setColleges(data.colleges);
          }
        })
        .catch(err => console.error('Error fetching colleges:', err));
    }
  }, [collegeType]);

  const handleEditClick = () => {
    setEditedData({
      name: organizationData?.name || '',
      phone: organizationData?.phone || '',
      description: organizationData?.description || '',
      college: organizationData?.college || '',
      bank: {
        name: organizationData?.bank?.name || '',
        accountNumber: organizationData?.bank?.accountNumber || '',
        ifsc: organizationData?.bank?.ifsc || '',
        accountHolderName: organizationData?.bank?.accountHolderName || '',
        accountType: organizationData?.bank?.accountType || ''
      },
      socialMedia: {
        instagram: organizationData?.socialMedia?.instagram || '',
        facebook: organizationData?.socialMedia?.facebook || '',
        twitter: organizationData?.socialMedia?.twitter || '',
        linkedin: organizationData?.socialMedia?.linkedin || '',
        youtube: organizationData?.socialMedia?.youtube || '',
        website: organizationData?.socialMedia?.website || '',
        whatsapp: organizationData?.socialMedia?.whatsapp || ''
      }
    });

    if (organizationData?.college) {
      const college = colleges.find(c => c._id === organizationData.college);
      if (college) {
        setCollegeType(college.type);
        setSelectedCollege(college);
      }
    }
    
    setEditMode(true);
  };

  const validateSocialMediaUrl = (platform, url) => {
    if (!url) return true;
    
    const patterns = {
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_\.]+\/?$/,
      facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_\.]+\/?$/,
      twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_\.]+\/?$/,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_\-\.]+\/?$/,
      youtube: /^https?:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9_\-]+\/?$/,
      website: /^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/,
      whatsapp: /^\+?[1-9]\d{1,14}$/
    };

    return patterns[platform]?.test(url) || "Invalid URL format";
  };

  const handleSave = async () => {
    try {
      const errors = {};
      Object.entries(editedData.socialMedia || {}).forEach(([platform, url]) => {
        const validationResult = validateSocialMediaUrl(platform, url);
        if (validationResult !== true) {
          errors[platform] = validationResult;
        }
      });

      if (Object.keys(errors).length > 0) {
        setSocialMediaErrors(errors);
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/organization/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        await fetchOrganizationData();
        setEditMode(false);
        setSocialMediaErrors({});
      } else {
        throw new Error('Failed to update organization data');
      }
    } catch (error) {
      console.error('Error updating organization data:', error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/organization/update-image`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          await fetchOrganizationData();
        } else {
          throw new Error('Failed to update organization image');
        }
      } catch (error) {
        console.error('Error updating organization image:', error);
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById('organization-image-input').click();
  };

  if (!organizationData) return <Typography>Loading...</Typography>;

  const calculateProfileCompletion = () => {
    const requiredFields = [
      { name: 'name', value: organizationData?.name },
      { name: 'email', value: organizationData?.email },
      { name: 'phone', value: organizationData?.phone },
      { name: 'description', value: organizationData?.description },
      { name: 'bank.name', value: organizationData?.bank?.name },
      { name: 'bank.accountNumber', value: organizationData?.bank?.accountNumber },
      { name: 'bank.ifsc', value: organizationData?.bank?.ifsc },
      { name: 'bank.accountHolderName', value: organizationData?.bank?.accountHolderName },
      { name: 'bank.accountType', value: organizationData?.bank?.accountType }
    ];

    const completedFields = requiredFields.filter(field => field.value);
    const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
    
    const missingFields = requiredFields
      .filter(field => !field.value)
      .map(field => field.name);

    return {
      percentage,
      isComplete: percentage === 100,
      missingFields
    };
  };

  const ProfileCompletionStatus = ({ completion }) => (
    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Profile Completion Status
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            width: '100%',
            height: 8,
            bgcolor: '#e0e0e0',
            borderRadius: 1,
            overflow: 'hidden',
            mr: 1,
          }}
        >
          <Box
            sx={{
              width: `${completion.percentage}%`,
              height: '100%',
              bgcolor: completion.isComplete ? '#4caf50' : '#ff9800',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </Box>
        <Typography variant="body2" fontWeight="bold" sx={{ minWidth: 45 }}>
          {completion.percentage}%
        </Typography>
      </Box>
      {!completion.isComplete && (
        <Typography variant="body2" color="warning.main">
          Missing information: {completion.missingFields.map(field => 
            field.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          ).join(', ')}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      {/* Organization Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={import.meta.env.VITE_IMAGE_URL + organizationData.image}
              alt={organizationData.name}
              sx={{ width: 80, height: 80, border: "4px solid #4caf50" }}
            />
            {editMode && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    bgcolor: '#4caf50',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#3d8b40' },
                  }}
                  onClick={handleImageClick}
                >
                  <CameraAlt sx={{ color: 'white', fontSize: 18 }} />
                </Box>
                <input
                  type="file"
                  id="organization-image-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </>
            )}
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {organizationData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Profile last updated - {new Date(organizationData.updatedAt).toLocaleDateString()}
            </Typography>
            
            <ProfileCompletionStatus completion={calculateProfileCompletion()} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Organization Details */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Organization Information</Typography>
        
        {/* Basic Information */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Business sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Organization Name:</Typography>
          {editMode ? (
            <TextField
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{organizationData.name}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <Description sx={{ color: "#4caf50", mr: 2, mt: 1 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium', mt: 1 }}>Description:</Typography>
          {editMode ? (
            <Box sx={{ flex: 1 }}>
              <ReactQuill
                value={editedData.description || ''}
                onChange={(content) => setEditedData({
                  ...editedData,
                  description: content
                })}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link'],
                    ['clean']
                  ],
                }}
                formats={[
                  'header',
                  'bold', 'italic', 'underline', 'strike', 'blockquote',
                  'list', 'bullet',
                  'link'
                ]}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Box>
          ) : (
            <Typography 
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(organizationData.description || "Not provided") 
              }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Phone sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Phone:</Typography>
          {editMode ? (
            <TextField
              value={editedData.phone}
              onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{organizationData.phone}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Mail sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Email:</Typography>
          <Typography>{organizationData.email}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Business sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>College:</Typography>
          {editMode ? (
            <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>College Type</InputLabel>
                <Select
                  value={collegeType}
                  onChange={(e) => {
                    setCollegeType(e.target.value);
                    setSelectedCollege(null);
                  }}
                  size="small"
                >
                  <MenuItem value="IIT">IIT</MenuItem>
                  <MenuItem value="NIT">NIT</MenuItem>
                  <MenuItem value="IIIT">IIIT</MenuItem>
                  <MenuItem value="GFTI">GFTI</MenuItem>
                  <MenuItem value="OTHER">OTHER</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel>Select College</InputLabel>
                <Select
                  value={selectedCollege?._id || ''}
                  onChange={(e) => {
                    const college = colleges.find(c => c._id === e.target.value);
                    setSelectedCollege(college);
                    setEditedData({
                      ...editedData,
                      college: e.target.value
                    });
                  }}
                  size="small"
                  disabled={!collegeType}
                >
                  {colleges.map(college => (
                    <MenuItem key={college._id} value={college._id}>
                      {college.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Typography>
              {organizationData.college ? organizationData?.college 
                : 'Not selected'}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bank Details */}
        <Typography variant="h6" sx={{ mb: 2 }}>Bank Information</Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccountBalance sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Bank Name:</Typography>
          {editMode ? (
            <TextField
              value={editedData.bank?.name}
              onChange={(e) => setEditedData({ 
                ...editedData, 
                bank: { ...editedData.bank, name: e.target.value }
              })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{organizationData.bank?.name || "Not provided"}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccountBalance sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Account Number:</Typography>
          {editMode ? (
            <TextField
              value={editedData.bank?.accountNumber}
              onChange={(e) => setEditedData({ 
                ...editedData, 
                bank: { ...editedData.bank, accountNumber: e.target.value }
              })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{organizationData.bank?.accountNumber || "Not provided"}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccountBalance sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>IFSC Code:</Typography>
          {editMode ? (
            <TextField
              value={editedData.bank?.ifsc}
              onChange={(e) => setEditedData({ 
                ...editedData, 
                bank: { ...editedData.bank, ifsc: e.target.value }
              })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{organizationData.bank?.ifsc || "Not provided"}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccountBalance sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Account Holder:</Typography>
          {editMode ? (
            <TextField
              value={editedData.bank?.accountHolderName}
              onChange={(e) => setEditedData({ 
                ...editedData, 
                bank: { ...editedData.bank, accountHolderName: e.target.value }
              })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{organizationData.bank?.accountHolderName || "Not provided"}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccountBalance sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Account Type:</Typography>
          {editMode ? (
            <Select
              value={editedData.bank?.accountType || ''}
              onChange={(e) => setEditedData({ 
                ...editedData, 
                bank: { ...editedData.bank, accountType: e.target.value }
              })}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Current">Current</MenuItem>
            </Select>
          ) : (
            <Typography>{organizationData.bank?.accountType || "Not provided"}</Typography>
          )}
        </Box>
      </Box>

      {/* Social Media Section */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>Social Media Links</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
        {/* Instagram */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Instagram sx={{ color: "#E4405F", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Instagram:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.instagram || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, instagram: e.target.value }
                });
                if (socialMediaErrors.instagram) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    instagram: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.instagram}
              helperText={socialMediaErrors.instagram}
              size="small"
              placeholder="Instagram profile URL"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.instagram || "Not provided"}
            </Typography>
          )}
        </Box>

        {/* Facebook */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Facebook sx={{ color: "#1877F2", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Facebook:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.facebook || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, facebook: e.target.value }
                });
                if (socialMediaErrors.facebook) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    facebook: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.facebook}
              helperText={socialMediaErrors.facebook}
              size="small"
              placeholder="Facebook profile URL"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.facebook || "Not provided"}
            </Typography>
          )}
        </Box>

        {/* Twitter */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Twitter sx={{ color: "#1DA1F2", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Twitter:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.twitter || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, twitter: e.target.value }
                });
                if (socialMediaErrors.twitter) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    twitter: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.twitter}
              helperText={socialMediaErrors.twitter}
              size="small"
              placeholder="Twitter profile URL"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.twitter || "Not provided"}
            </Typography>
          )}
        </Box>

        {/* LinkedIn */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LinkedIn sx={{ color: "#0A66C2", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>LinkedIn:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.linkedin || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, linkedin: e.target.value }
                });
                if (socialMediaErrors.linkedin) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    linkedin: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.linkedin}
              helperText={socialMediaErrors.linkedin}
              size="small"
              placeholder="LinkedIn profile URL"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.linkedin || "Not provided"}
            </Typography>
          )}
        </Box>

        {/* YouTube */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <YouTube sx={{ color: "#FF0000", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>YouTube:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.youtube || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, youtube: e.target.value }
                });
                if (socialMediaErrors.youtube) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    youtube: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.youtube}
              helperText={socialMediaErrors.youtube}
              size="small"
              placeholder="YouTube channel URL"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.youtube || "Not provided"}
            </Typography>
          )}
        </Box>

        {/* Website */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Language sx={{ color: "#000000", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Website:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.website || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, website: e.target.value }
                });
                if (socialMediaErrors.website) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    website: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.website}
              helperText={socialMediaErrors.website}
              size="small"
              placeholder="Website URL"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.website || "Not provided"}
            </Typography>
          )}
        </Box>

        {/* WhatsApp */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <WhatsApp sx={{ color: "#25D366", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>WhatsApp:</Typography>
          {editMode ? (
            <TextField
              value={editedData.socialMedia?.whatsapp || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  socialMedia: { ...editedData.socialMedia, whatsapp: e.target.value }
                });
                if (socialMediaErrors.whatsapp) {
                  setSocialMediaErrors({
                    ...socialMediaErrors,
                    whatsapp: undefined
                  });
                }
              }}
              error={!!socialMediaErrors.whatsapp}
              helperText={socialMediaErrors.whatsapp}
              size="small"
              placeholder="WhatsApp number"
              sx={{ minWidth: 300 }}
            />
          ) : (
            <Typography>
              {organizationData.socialMedia?.whatsapp || "Not provided"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Move the Edit/Save Buttons to bottom */}
      <Box sx={{ 
        mt: 4, 
        pt: 2, 
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        {editMode ? (
          <>
            <Button
              startIcon={<Save />}
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mr: 1 }}
            >
              Save Changes
            </Button>
            <Button
              startIcon={<Cancel />}
              variant="outlined"
              color="error"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            startIcon={<Edit />}
            variant="contained"
            color="primary"
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        )}
      </Box>

      {/* Verification Status */}
      {(!organizationData.emailVarified || !organizationData.phoneVarified) && (
        <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
          <Typography variant="body1" color="warning.main" sx={{ display: 'flex', alignItems: 'center' }}>
            <Warning sx={{ mr: 1 }} />
            {!organizationData.emailVarified && "Email verification pending. "}
            {!organizationData.phoneVarified && "Phone verification pending."}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
