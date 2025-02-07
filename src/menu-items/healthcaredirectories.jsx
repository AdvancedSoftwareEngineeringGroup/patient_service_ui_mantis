// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { SiReasonstudios } from 'react-icons/si';
import { FaUsers } from 'react-icons/fa';
import { FaRegHospital } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { FaUserNurse } from 'react-icons/fa';
import { RiCalendarScheduleLine } from 'react-icons/ri';
// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  SiReasonstudios,
  FaUsers,
  FaRegHospital,
  FaUserDoctor,
  FaUserNurse,
  RiCalendarScheduleLine
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const healthcaredirectories = {
  id: 'healthcaredirectories',
  title: 'Healthcare Directories',
  type: 'group',
  children: [
    {
      id: 'patients-list',
      title: 'Patients',
      type: 'item',
      url: '/patients',
      icon: icons.FaUsers
    },
    {
      id: 'physicians-list',
      title: 'Physicians',
      type: 'item',
      url: '/physicians',
      icon: icons.FaUserDoctor
    },
    {
      id: 'nurses-list',
      title: 'Nurses',
      type: 'item',
      url: '/nurses',
      icon: icons.FaUserNurse
    },
    {
      id: 'hospitals-list',
      title: 'Hospitals',
      type: 'item',
      url: '/hospitals',
      icon: icons.FaRegHospital
    },
    {
      id: 'appointments-list',
      title: 'Appointments',
      type: 'item',
      url: '/appointments',
      icon: icons.RiCalendarScheduleLine
    }
  ]
};

export default healthcaredirectories;
