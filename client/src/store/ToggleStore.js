import {create} from 'zustand';


const ToggleStore=create((set)=>({

    isOpen:true,
    toggleOpen: () =>
        set((state) => ({
          isOpen: !state.isOpen, 
        })),

}))

export default ToggleStore;