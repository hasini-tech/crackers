<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep decorative 3D fireworks in a separate React Three Fiber module mounted by the client-only shop route, so WebGL does not run during SSR.
- Keep catalog data and cart totals in a browser-safe catalog module, so prices are shared by display and tests.
