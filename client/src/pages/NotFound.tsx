import React from 'react';
import { Navigate } from 'react-router-dom';

import { urls } from '../urls';

export const NotFound = () => <Navigate to={urls.home} />
