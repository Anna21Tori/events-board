import styled from "styled-components";

const Content = styled.div<{$width: number}>`
                        width: ${props => props.$width}%;
                        height: 100vh;
                        position: relative;
                    `
export default Content;