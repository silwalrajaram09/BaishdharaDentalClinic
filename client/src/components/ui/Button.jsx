import styled, { css } from "styled-components";

const Button = ({
  text = "Button",
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  icon = null,
}) => {
  return (
    <Wrapper $variant={variant} $fullWidth={fullWidth}>
      <button type={type} onClick={onClick} disabled={disabled}>
        <span className="glow glow-1" />
        <span className="glow glow-2" />
        <span className="glow glow-3" />

        <span className="content">
          {icon && <span className="icon">{icon}</span>}
          {text}
        </span>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "fit-content")};

  button {
    position: relative;
    overflow: hidden;

    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    padding: 0.95rem 2rem;

    border: none;
    border-radius: 999px;

    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.02em;

    cursor: pointer;

    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      background 0.3s ease;

    backdrop-filter: blur(10px);

    isolation: isolate;
  }

  .content {
    position: relative;
    z-index: 5;

    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon {
    display: flex;
    align-items: center;
  }

  .glow {
    position: absolute;

    border-radius: 50%;

    filter: blur(10px);

    opacity: 0.25;

    transition:
      transform 0.6s ease,
      opacity 0.4s ease;
  }

  .glow-1 {
    width: 120px;
    height: 120px;

    top: -40px;
    left: -30px;
  }

  .glow-2 {
    width: 140px;
    height: 140px;

    bottom: -70px;
    right: -40px;
  }

  .glow-3 {
    width: 80px;
    height: 80px;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%) scale(0);
  }

  button:hover {
    transform: translateY(-2px);
  }

  button:hover .glow-3 {
    transform: translate(-50%, -50%) scale(3.5);
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      button {
        background: linear-gradient(135deg, #3b7dbd, #2a6ca5);

        color: white;

        box-shadow:
          0 12px 30px rgba(59, 125, 189, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }

      .glow {
        background: #86d7e9;
      }

      button:hover {
        box-shadow:
          0 18px 40px rgba(59, 125, 189, 0.35),
          inset 0 1px 0 rgba(255, 255, 255, 0.25);
      }
    `}

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      button {
        background: rgba(255, 255, 255, 0.08);

        color: white;

        border: 1px solid rgba(255, 255, 255, 0.2);

        box-shadow:
          0 8px 24px rgba(0, 0, 0, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .glow {
        background: #86d7e9;
      }

      button:hover {
        background: rgba(255, 255, 255, 0.14);
      }
    `}

  ${({ $variant }) =>
    $variant === "accent" &&
    css`
      button {
        background: linear-gradient(135deg, #e8453c, #c9362f);

        color: white;

        box-shadow:
          0 12px 30px rgba(232, 69, 60, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }

      .glow {
        background: #ffb2ae;
      }

      button:hover {
        box-shadow: 0 18px 40px rgba(232, 69, 60, 0.35);
      }
    `}

  @media (max-width: 640px) {
    button {
      width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

      padding: 0.9rem 1.4rem;

      font-size: 0.9rem;
    }
  }
`;

export default Button;
