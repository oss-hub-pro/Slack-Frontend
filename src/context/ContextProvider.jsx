import AuthProvider from "./AuthProvider";
import SlackProvider from "./SlackProvider";

const ContextProvider = (props) => {
    return (
        <AuthProvider>
            <SlackProvider>
                {props.children}
            </SlackProvider>
        </AuthProvider>
    )
}
export default ContextProvider