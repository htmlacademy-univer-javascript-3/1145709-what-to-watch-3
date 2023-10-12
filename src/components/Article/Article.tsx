interface ArticleProps {
  imageSrc: string;
  linkText: string;
}


function Article(props: ArticleProps): JSX.Element {
  const {imageSrc, linkText} = props;


  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imageSrc}
          alt={linkText} width="280" height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{linkText}</a>
      </h3>
    </article>
  );
}

export default Article;
