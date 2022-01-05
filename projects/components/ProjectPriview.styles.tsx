import styled from "@emotion/styled"

interface ProjectPreviewStyledProps {
  variant: "primary" | "outline"
}

const ProjectPreviewStyled = styled.div<ProjectPreviewStyledProps>`
  outline: ${(props) => (props.variant === "outline" ? "solid 1px blue" : null)};
  border-radius: ${(props) => (props.variant === "outline" ? "8px" : null)};
  max-width: 24rem;
`

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
`

const Header = styled.div`
  padding: 8px 16px;
`

const Body = styled.div`
  margin-top: 16px;
`

export { ProjectPreviewStyled, Title, Header, Body }
