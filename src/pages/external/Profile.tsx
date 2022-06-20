import React from 'react';
import {QRCodeSVG} from 'qrcode.react';
import api from '../../services/fetchProfile';

export interface IProfilePageProps {};

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {

    React.useEffect(() => {

        api('/api/Customer/3132').then(result => {
            console.log(result?.data);
        });
    //     api.get(`/api/Customer/${uuid}`).then(result => {
    //          if(result?.data?.success) {
    //              setCustomer(result?.data?.data);
    //          }
    //     })
    //      .catch((error) => {
    //       console.log(error);
    //    });
        
     }, []);

    return(
        <>
            <h1 className="text-2xl font-semibold mb-5">Serviço Público Federal</h1>
            Sistema COFECI-

            <QRCodeSVG
                value='http://localhost:3000/query/profile/2c39f967-e1fb-11ec-a13f-001e6786919d'
            />

<div className="container h-screen max-w-full">
  <div className="m-auto my-28 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
    <div className="h-24 bg-white"></div>
    <div className="-mt-20 flex justify-center">
      <img className="h-32 rounded-full" src="https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=" />
    </div>
    <div className="mt-5 mb-1 px-3 text-center text-lg">Your Name</div>
    <div className="mb-5 px-3 text-center text-sky-500">Title</div>
    <blockquote>
      <p className="mx-2 mb-7 text-center text-base">Bio</p>
    </blockquote>
  </div>
</div>
            
        </>
    );
};

export default ProfilePage;
