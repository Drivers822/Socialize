// src/components/TeamSection.jsx
import React from 'react';
import '../Styles/Team.css';
import ceoImg from '../assets/Rushi.jpg';
import pmImg from '../assets/jay.jpg';
import ctoImg from '../assets/Ajit.jpg';

import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const platformIcons = {
  x: <FaXTwitter />,
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
};

const teamData = [
  {
    name: 'Er. Rushikesh Kekane',
    role: 'Founder & CEO',
    image: ceoImg,
    social: [
      { platform: 'x', link: 'https://x.com/DriversN3400' },
      { platform: 'facebook', link: 'https://www.facebook.com/people/Drivers-Socialize-Networks/61575241652399/' },
      { platform: 'instagram', link: 'https://www.instagram.com/drivers_socialize_networks/?hl=en' },
      { platform: 'linkedin', link: 'https://www.linkedin.com/company/drivers-socialize-networks/?viewAsMember=true' },
    ],
  },
  {
    name: 'Er. Jay Rahatal',
    role: 'Co-Founder & Project Head',
    image: pmImg,
    social: [
      { platform: 'x', link: 'https://x.com/DriversN3400' },
      { platform: 'facebook', link: 'https://www.facebook.com/share/1BnkLq4Gsg/?mibextid=wwXIfr' },
      { platform: 'instagram', link: 'https://www.instagram.com/jay_rahatal?igsh=M3hucDZsZndmMDdl&utm_source=qr' },
      { platform: 'linkedin', link: 'https://www.linkedin.com/in/jay-rahatal-b569b8235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    ],
  },
  {
    name: 'Er. Ajit Chourashiya',
    role: 'Co-Founder & CTO',
    image: ctoImg,
    social: [
      { platform: 'x', link: 'https://x.com/DriversN3400' },
      { platform: 'facebook', link: 'https://www.facebook.com/ajit.chourasiya.50' },
      { platform: 'instagram', link: 'https://www.instagram.com/ajit_140601?igsh=MW9oMmoyMGhvcjcxYQ==' },
      { platform: 'linkedin', link: 'https://www.linkedin.com/in/ajit-chourashiya-83782a150?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    ],
  },
];

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-header">
        <p className="sub-title">TEAM</p>
        <h2 className="gallery-title">
          CHECK <span className="highlight">OUR TEAM</span>
        </h2>
      </div>
      <div className="team-members">
        {teamData.map((member, index) => (
          <div className="member-card" key={index}>
            <img src={member.image} alt={member.name} className="member-img" />
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-icons">
                {member.social.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link"
                  >
                    {platformIcons[social.platform]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
