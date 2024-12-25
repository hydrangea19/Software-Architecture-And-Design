import React from 'react';


function UserProfile ()  {
  const userDetails = [
    { label: 'Name', value: 'Emma Williams' },
    { label: 'Email', value: 'emmawilliams@gmail.com' },
    { label: 'Phone', value: '075674865' }
  ];

  return (
    <div className="profileContainer">
      <div className="profileImage" role="img" aria-label="Profile picture" />
      {userDetails.map((detail, index) => (
        <div key={index} className="fieldContainer">
          <label className="fieldLabel">{detail.label}</label>
          <div className="fieldValue">{detail.value}</div>
        </div>
      ))}
    </div>
  );
}
export default UserProfile;