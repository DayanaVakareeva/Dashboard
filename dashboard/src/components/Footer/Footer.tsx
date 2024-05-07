import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Footer component
 * @returns JSX.Element
 */
export default function Footer() {
    
    return (
        <div className="flex flex-row space-x-6 w-full border-t justify-between p-4 items-center text-orange-500">
            <div className="flex space-x-4"> 
                <span>About</span>
                <span>Careers</span>
                <span>Partners</span> </div>
            <div className="flex space-x-4">
                <span><FacebookRoundedIcon sx={{ color: 'orange' }}/></span>
                <span><InstagramIcon sx={{ color: 'orange' }}/></span>
                <span><XIcon sx={{ color: 'orange' }}/></span>                
                <span><GitHubIcon sx={{ color: 'orange' }}/></span></div>
            <p>© 2024 Dayana Vakareeva</p>
        </div>
    )
}