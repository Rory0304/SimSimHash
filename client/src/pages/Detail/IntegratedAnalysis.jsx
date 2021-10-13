/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React from "react";

import { ShowGraph } from "./ShowGraph";

const integrateAreaWrapper = css`
    h3 {
        color: #fff;
        font-size: 2.3rem;
        font-weight: bold;
    }
`;

const IntegratedAnalysis = React.forwardRef(({ movie }, ref) => {
    return (
        <div css={integrateAreaWrapper} ref={ref}>
            <h3>통합 분석</h3>
            <ShowGraph noreviewarr={movie.noreviewarr} />
        </div>
    );
});

export default IntegratedAnalysis;
