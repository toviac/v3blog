import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ easing: 'ease', speed: 500 });
NProgress.configure({ showSpinner: false });

export default NProgress;
