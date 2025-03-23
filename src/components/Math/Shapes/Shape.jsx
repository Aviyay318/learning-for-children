import "./Shapes.css"
import useSetResponsiveProperty from "../../../hooks/responsiveHooks/useSetResponsiveProperty.js";
export default function Shape ({type,number,size, color}) {
    useSetResponsiveProperty("--shapes-size")
    function getTriangleCustomStyle(type){
        if (type === "triangle"){
            return {
                borderBottomColor: color,
                backgroundColor: "transparent",
                filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3)"
            };
        } else {
            return {
                backgroundColor: color,
                boxShadow: "var(--shapes-default-border-color) 3px 3px 8px -3px",
            }
        }
    }

    return(
        <div className={`${type} shape`}
             style={{
                 width: size,
                 height: size,
                 ...getTriangleCustomStyle(type),
             }}>
            {number}
        </div>
    )
}