const PageFooter = (): React.ReactElement => {
  return (
    <footer>
      <section className="hero is-link">
        <div className="hero-body">
          <div className="container has-text-centered">
            &copy; KeyManager, {new Date().getFullYear()}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default PageFooter;
