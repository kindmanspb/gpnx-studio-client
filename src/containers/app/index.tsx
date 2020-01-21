import React, { Suspense, lazy, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { isMobile } from 'react-device-detect';


const HomePage = lazy(() => import('../home-page'));

const App: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={'/'} component={HomePage} />
            </Switch>
        </Suspense>
    );
};

export default memo(App);
