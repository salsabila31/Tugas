import { createContext,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"

const SkillContext = createContext();

const initialForm = {
    name:"",
    slug:"",
}; 

export const SkillProvider = ({ children }) => {
    const [formValues, setformValues] = useState (initialForm);
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        const {name, value} = e.target;
        setformValues({...formValues, [name]: value});
    }

    const getSkills = async() => {
        const apiSkills = await axios.get("skills");
        setSkills(apiSkills.data.data);
    }
    const getSkill = async (id) => {
        const response = await axios.get("skills/" + id );
        const apiSkill = response.data.data
        setSkill(apiSkill);
        setformValues ({
            name:apiSkill.name,
            slug:apiSkill.slug,
        });
    };

    const storeSkill = async (e) => {
        e.preventDefault();
        try{
            await axios.post("skills", formValues);
            setformValues(initialForm);
            navigate("/skills");
        }catch(e){
            if(e.response.status === 422){
                setErrors(e.response.data.errors)
            }
        }
    }

    const updateSkill = async (e) => {
        e.preventDefault();
        try{
            await axios.put("skills/" + skill.id, formValues);
            setformValues(initialForm);
            navigate("/skills");
        }catch(e){
            if(e.response.status === 422){
                setErrors(e.response.data.errors)
            }
        }
    }

    const deleteSkill = async (id) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        await axios.delete("skills/" + id);
        getSkills();
    }

    return <SkillContext.Provider value={{skill, skills, getSkill, getSkills, onChange, formValues, storeSkill, errors, setErrors, updateSkill, deleteSkill}}
    >
        {children}
    </SkillContext.Provider>
}
export default SkillContext;