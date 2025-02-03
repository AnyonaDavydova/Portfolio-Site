import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { addProject } from '../store/projectsSlice';
import { PrjFormInputs } from '../types/PrjFormInputs.ts';
import { Project } from '../types/Project';
import '../styles/AddPtj.css';

interface AddProjectFormProps {
    onClose: () => void;
}

export const AddProjectForm = ({ onClose }: AddProjectFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector((state: RootState) => state.projects.items);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<PrjFormInputs>();

    const generateNumericId = (): number => {
        const uuid = uuidv4();
        return parseInt(uuid.replace(/-/g, '').slice(0, 15), 16);
    };

    const Technologies = ['React', 'TypeScript', 'JavaScript', 'Unity', 'Vue', 'Electron'];

    const handleAddProject: SubmitHandler<PrjFormInputs> = (data) =>{
        const techArray = data.technologies.split(',').map((tech) => tech.trim());
        const isValidTech = techArray.every((tech) => Technologies.includes(tech));

        if (!isValidTech) {
            setError('technologies', {
                type: 'manual',
                message: `Допустимые технологии, выберите что-то из списка: ${Technologies.join(', ')}`,
            });
            return;
        }

        const newProject: Project = {
            id: generateNumericId(),
            title: data.title,
            description: data.description,
            technologies: techArray,
            link: data.link,
        };

        dispatch(addProject(newProject));
        localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
        reset();
        onClose();
    };

    return (
        <div className="add-project">
            <h2>Добавление проекта</h2>
            <form onSubmit={handleSubmit(handleAddProject)}>
                <input type="text" placeholder="Название проекта"
                       aria-label="Название проекта" {...register('title', {required: 'Название проекта обязательно'})}
                       className="form-input"/>
                {errors.title && <p className="error-message">{errors.title.message}</p>}
                <textarea placeholder="Описание проекта"
                          aria-label="Описание проекта" {...register('description', {required: 'И описание проекта обязательно'})}
                          className="form-textarea"/>
                {errors.description && <p className="error-message">{errors.description.message}</p>}
                <input type="text" placeholder="Технологии"
                       aria-label="Технологии проекта" {...register('technologies', {required: 'Указать технологии тоже обязательно'})}
                       className="form-input"/>
                {errors.technologies && <p className="error-message">{errors.technologies.message}</p>}
                <input type="text" placeholder="Ссылка на проект"
                       aria-label="Ссылка на проект" {...register('link', {required: 'Ссылка на проект ТОЖЕ обязательна'})}
                       className="form-input"/>
                {errors.link && <p className="error-message">{errors.link.message}</p>}
                <div className="form-buttons-container">
                    <button type="submit" className="form-button">Добавить</button>
                    <button type="button" onClick={onClose} className="back-button">Назад</button>
                </div>

            </form>
        </div>
    );
};
