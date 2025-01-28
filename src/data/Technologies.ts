import { ITechnology } from "../types/Technology";

import APIcon from "../assets/Icons/TAP.svg"
import AsepiteIcon from "../assets/Icons/TAsep.svg"
import BlenderIcon from "../assets/Icons/TAP.svg"
import UnityIcon from "../assets/Icons/TAP.svg"
import ReactIcon from "../assets/Icons/TAP.svg"
import VueIcon from "../assets/Icons/TAP.svg"

export const Technologies: ITechnology[] = [
    {
        logo: APIcon,
        name: 'Adobe Photoshop',
        experience: '3 года',
        doclink: 'https://helpx.adobe.com/ru/photoshop/user-guide.html',
    },
    {
        logo: AsepiteIcon,
        name: 'Aseprite',
        experience: '2 года',
        doclink: 'https://docs.unity3d.com/',
    },
    {
        logo: BlenderIcon,
        name: 'Blender',
        experience: 'полгода',
        doclink: 'https://docs.unity3d.com/',
    },
    {
        logo: UnityIcon,
        name: 'Unity',
        experience: 'полгода',
        doclink: 'https://docs.unity3d.com/',
    },
    {
        logo: ReactIcon,
        name: 'React',
        experience: 'полгода',
        doclink: 'https://react.dev/',
    },
    {
        logo: VueIcon,
        name: 'Vue',
        experience: '1 год',
        doclink: 'https://vuejs.org/',
    }
]