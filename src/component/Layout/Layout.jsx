import Footer from './Footer';
import Header from './Header';
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,keywords,author}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <div>
                  <meta name="description" content={description} />
                  <meta name="keywords" content={keywords}/>
                  <meta name="author" content={author} />
                </div>
                <title>{title}</title>               
            </Helmet>
            
            <Header/>
                <main>
                    <Toaster position="top-right"/>
                    {children}
                </main>
            <Footer/>
        </div>
    );
};

Layout.defaultProps = {
    title: "Hire Worker Website",
    description: "Hire Worker website for online Worker hire",
    keywords: "Hire Worker",
    author: "NH-Anik",
}

export default Layout;