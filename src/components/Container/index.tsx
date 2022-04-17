import './container.css';

export const Container = ({children}: any) => {
    return(
        <div className="container">
            {children}
        </div>
    )
}