import type { PlanCards, tableAction,ProductTable,EarningReports } from '@/types/dashboard/index';


import user1 from '@/assets/images/profile/user-1.jpg';
import user2 from '@/assets/images/profile/user-2.jpg';
import user3 from '@/assets/images/profile/user-3.jpg';

import { EditIcon, PlusIcon, TrashIcon } from 'vue-tabler-icons';
//Products Table
import product1 from '@/assets/images/products/s1.jpg';
import product2 from '@/assets/images/products/s2.jpg';
import product3 from '@/assets/images/products/s3.jpg';
import product4 from '@/assets/images/products/s4.jpg';
import product5 from '@/assets/images/products/s5.jpg';


const ProductTableData: ProductTable[] = [
    {
        img: product1,
        name: 'iPhone 13 pro max-Pacific Blue-128GB storage',
        payment: '$180',
        paymentstatus: 'Partially paid',
        process: 45,
        processcolor: 'warning',
        statuscolor: 'secondary',
        statustext: 'Confirmed'
    },
    {
        img: product2,
        name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
        payment: '$120',
        paymentstatus: 'Full paid',
        process: 100,
        processcolor: 'success',
        statuscolor: 'success',
        statustext: 'Confirmed'
    },
    {
        img: product3,
        name: 'PlayStation 5 DualSense Wireless Controller',
        payment: '$120',
        paymentstatus: 'Cancelled',
        process: 100,
        processcolor: 'error',
        statuscolor: 'error',
        statustext: 'Cancelled'
    },
    {
        img: product5,
        name: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
        payment: '$120',
        paymentstatus: 'Partially paid',
        process: 45,
        processcolor: 'warning',
        statuscolor: 'secondary',
        statustext: 'Confirmed'
    },
    {
        img: product4,
        name: 'Sony X85J 75 Inch Sony 4K Ultra HD LED Smart',
        payment: '$120',
        paymentstatus: 'Full paid',
        process: 100,
        processcolor: 'success',
        statuscolor: 'success',
        statustext: 'Confirmed'
    }
];


/*--Plan Cards--*/
const PlanCardData: PlanCards[] = [
    {
        coveravatar: 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg',
        duration: '30 min',
        title: 'Yin Yoga',
        link: '/',
        category: 'Beginner',
        name: 'Georgeanna Ramero',
    },
    {
        coveravatar: 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg',
        duration: '30 min',
        title: 'Restorative Yoga',
        link: '/',
        category: 'Intermediary',
        name: 'Georgeanna Ramero',
    },
    {
        coveravatar: 'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.svg',
        duration: '30 min',
        title: 'Something Yoga',
        link: '/',
        category: 'Advanced',
        name: 'Georgeanna Ramero',
    }
];


const tableActionData: tableAction[] = [
  {
      icon: PlusIcon,
      listtitle: 'Add'
  },
  {
      icon: EditIcon,
      listtitle: 'Edit'
  },
  {
      icon: TrashIcon,
      listtitle: 'Delete'
  }
];

/*--EarningReports--*/
const EarningReportsData: EarningReports[] = [
  {
      icon: 'card-line-duotone',
      title: 'Bank Transfer',
      subtitle: 'and +1 more',
      color: 'primary',
      statuscolor: 'success',
      statustext: '16.3%',
  },
  {
      icon: 'wallet-2-line-duotone',
      title: 'Net Profit',
      subtitle: 'and +4 more',
      color: 'error',
      statuscolor: 'success',
      statustext: '12.55%',
  },
  {
      icon: 'course-up-line-duotone',
      title: 'Total Income',
      subtitle: 'and +4 more',
      color: 'secondary',
      statuscolor: 'success',
      statustext: '12.55%',
  },
  {
      icon: 'waterdrops-line-duotone',
      title: 'Total Expenses',
      subtitle: 'and +2 more',
      color: 'info',
      statuscolor: 'success',
      statustext: '8.28%',
  },
  {
    icon: 'wallet-2-line-duotone',
    title: 'Net Profit',
    subtitle: 'and +4 more',
    color: 'warning',
    statuscolor: 'success',
    statustext: '12.55%',
},
 
];


export {ProductTableData,PlanCardData,tableActionData,EarningReportsData}