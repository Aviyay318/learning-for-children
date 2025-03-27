import "./StarRating.css"
import {useEffect} from "react";
export default function StarRating({earnedStars, totalStars = 3, onStarsAnimationEnd}) {
    useEffect(() => {
        const totalTime = (earnedStars - 1) * 0.3 + 0.3;
        const timer = setTimeout(() => {
            if (onStarsAnimationEnd){
                onStarsAnimationEnd();
            }
        }, totalTime * 1000);
        return () => clearTimeout(timer);
    },[earnedStars, onStarsAnimationEnd]);
    return (
        <div className="star-rating">
            {Array.from({ length: totalStars }, (_, i) => {
                const isFilled = i < earnedStars;
                const isMiddle = i === Math.floor(totalStars / 2);
                const delay = 0.3 * i
                    return (
                        <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width={isMiddle ? 100 : 60}
                            height={isMiddle ? 100 : 60}
                            viewBox="0 0 24 24"
                            className={`star ${isFilled ? 'filled' : 'unfilled'} ${isMiddle ? 'middle' : ''}`}
                            style={isFilled ? {animationDelay: `${delay}s`} : {}}
                        >
                            <path
                                d="M12 .587l3.668 7.431L24 9.75l-6 5.854 1.416 8.266L12 18.896l-7.416 4.974L6 15.604 0 9.75l8.332-1.732z"/>
                        </svg>
                        )

            })}
        </div>
    )
}