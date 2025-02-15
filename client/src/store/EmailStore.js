import {create} from 'zustand';

const EmailStore=create((set)=>({

    userEmail: "",
    setUserEmail: (Email) => {
        set({ userEmail: Email })},
 

   

}))

export default EmailStore;