import "./Shapes.css"
export default function Shape ({type,number,size, color, border}) {
    return(
        <div className={`${type} shape`}
             style={{
                 width: size,
                 height: size,
                 backgroundColor: color,
                 borderColor: border
             }}>
            {number}
        </div>
    )
}