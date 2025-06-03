export const GPTPage = () => {
  return (
    <div className="w-full mx-auto max-w-3xl overflow-x-clip px-4 mt-20">
      <div className="mb-6">
        <div className="my-2 text-center text-3xl font-bold md:my-4 md:text-5xl">
          GPT
        </div>
        <div className="text-token-text-secondary mx-auto w-full text-center text-sm md:text-lg md:leading-tight">
          지시 사항이나 지식 보강은 물론, 온갖 스킬을 다양하게 조합한 ChatGPT의
          맞춤형 버전을 탐색하고 만들어 보세요.
        </div>
      </div>

      {/* 검색창 */}
      <div className="bg-white sticky top-16 z-20 -mt-2 mb-12 flex flex-col gap-6 pt-2 [@media(min-width:1560px)]:top-0">
        <div className="relative z-0 flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 text-token-text-tertiary icon-md absolute start-5 top-1/2 z-30 -translate-y-1/2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.75 4.25C7.16015 4.25 4.25 7.16015 4.25 10.75C4.25 14.3399 7.16015 17.25 10.75 17.25C14.3399 17.25 17.25 14.3399 17.25 10.75C17.25 7.16015 14.3399 4.25 10.75 4.25ZM2.25 10.75C2.25 6.05558 6.05558 2.25 10.75 2.25C15.4444 2.25 19.25 6.05558 19.25 10.75C19.25 12.7369 18.5683 14.5645 17.426 16.0118L21.4571 20.0429C21.8476 20.4334 21.8476 21.0666 21.4571 21.4571C21.0666 21.8476 20.4334 21.8476 20.0429 21.4571L16.0118 17.426C14.5645 18.5683 12.7369 19.25 10.75 19.25C6.05558 19.25 2.25 15.4444 2.25 10.75Z"
              fill="currentColor"
            />
          </svg>
          <div className="relative z-10 grow">
            <div className="rounded-xl border border-gray-300 shadow-none border-token-border-medium focus-within:border-token-border-xheavy focus-within:ring-token-text-secondary px-3 py-2 focus-within:ring-1">
              <div className="relative">
                <input
                  id="search"
                  name="search"
                  className="block w-full border-0 p-0 shadow-none outline-hidden bg-white text-token-text-primary placeholder-gray-500 py-4 px-3 rounded-xl font-normal text-base ps-12"
                  type="text"
                  placeholder="GPT 검색"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="GPT 검색"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white sticky top-14 z-10 -ms-4 w-screen py-2 text-sm md:ms-0 md:w-full md:pb-0">
        <div className="mb-10 no-scrollbar flex scroll-m-5 gap-1.5 overflow-x-auto md:overflow-hidden">
          <div className="text-base md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 border-token-text-primary text-token-main-surface-primary bg-black md:rounded-none md:border-b-2 dark:bg-gray-100 dark:md:bg-transparent">
            최상위 선택 항목
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            글쓰기
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            생산성
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            연구 및 분석
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            교육
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            라이프스타일
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            DALL·E
          </div>
          <div className="text-base text-gray-500 md:text-token-text-primary cursor-pointer scroll-mx-5 rounded-3xl px-3 py-2 whitespace-nowrap select-none first:ms-4 last:me-4 md:bg-transparent md:px-2 md:first:ms-0 md:last:me-0 bg-token-main-surface-secondary hover:text-token-text-primary md:text-token-text-tertiary hover:bg-gray-100 md:rounded-lg md:hover:bg-gray-50 dark:hover:bg-white/20 dark:md:bg-transparent dark:md:hover:bg-gray-700">
            프로그래밍
          </div>
        </div>
      </div>
      <div className="mb-10 flex flex-col items-start justify-center">
        <p className="text-2xl font-bold">Featured</p>
        <p className="text-lg font-semibold text-gray-500">
          Curated top picks from this week
        </p>
      </div>

      {/* 예시: 추천 GPT 카드 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <a
          className="gizmo-link cursor-pointer group flex h-35 items-center gap-5 overflow-hidden rounded-xl bg-gray-50 px-7 py-8 hover:bg-gray-100"
          href="#"
        >
          <div className="h-16 w-16 shrink-0">
            <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
              <img
                className="bg-token-tertiary h-full w-full"
                alt="GPT Icon"
                width="80"
                height="80"
                src="https://chatgpt.com/backend-api/content?id=file-fGE6EGZCQY73C76MJantfE0d&gizmo_id=g-0S5FXLyFN&ts=485707&p=gpp&sig=11b9bd2ef7c21d15e6834c825b7cc7829b4ecab2738cf328acc651d918869d6a&v=0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-lg">Wolfram</div>
            <span className="text-xs text-token-text-tertiary">
              Access computation, math, chemistry, curated knowledge & real-time
              data from Wolfram|Alpha
            </span>
            <div className="mt-1 text-xs text-token-text-tertiary">
              작성자: wolfram.com
            </div>
          </div>
        </a>
        <a
          className="gizmo-link cursor-pointer group flex h-24 items-center gap-5 overflow-hidden rounded-xl bg-gray-50 px-7 py-8 hover:bg-gray-100 md:h-32 lg:h-36 dark:bg-gray-700 dark:hover:bg-white/10"
          href="#"
        >
          <div className="h-16 w-16 shrink-0 md:h-24 md:w-24">
            <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
              <img
                className="bg-token-tertiary h-full w-full"
                alt="GPT Icon"
                width="80"
                height="80"
                src="https://chatgpt.com/backend-api/content?id=file-6qPLxHx8u9lf2XszRtWG25RD&amp;gizmo_id=g-alKfVrz9K&amp;ts=485761&amp;p=gpp&amp;sig=86343ad6ad969057c398f2993c30a4ead779efb589be719985a5753805abdc81&amp;v=0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="line-clamp-2 font-semibold md:text-lg">Canva</div>
            <span className="line-clamp-2 text-xs md:line-clamp-3">
              Effortlessly design anything: presentations, logos, social media
              posts and more.
            </span>
            <div className="text-token-text-tertiary mt-1 line-clamp-1 flex justify-start gap-1 text-xs">
              <div className="flex flex-row items-center space-x-1">
                <div className="text-token-text-tertiary text-xs">
                  작성자: canva.com
                </div>
              </div>
            </div>
          </div>
        </a>
        <a
          className="gizmo-link cursor-pointer group flex h-35 items-center gap-5 overflow-hidden rounded-xl bg-gray-50 px-7 py-8 hover:bg-gray-100"
          href="#"
        >
          <div className="h-16 w-16 shrink-0">
            <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
              <img
                className="bg-token-tertiary h-full w-full"
                alt="GPT Icon"
                width="80"
                height="80"
                src="https://chatgpt.com/backend-api/content?id=file-fGE6EGZCQY73C76MJantfE0d&gizmo_id=g-0S5FXLyFN&ts=485707&p=gpp&sig=11b9bd2ef7c21d15e6834c825b7cc7829b4ecab2738cf328acc651d918869d6a&v=0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-lg">Wolfram</div>
            <span className="text-xs text-token-text-tertiary">
              Access computation, math, chemistry, curated knowledge & real-time
              data from Wolfram|Alpha
            </span>
            <div className="mt-1 text-xs text-token-text-tertiary">
              작성자: wolfram.com
            </div>
          </div>
        </a>
        <a
          className="gizmo-link cursor-pointer group flex h-24 items-center gap-5 overflow-hidden rounded-xl bg-gray-50 px-7 py-8 hover:bg-gray-100 md:h-32 lg:h-36 dark:bg-gray-700 dark:hover:bg-white/10"
          href="#"
        >
          <div className="h-16 w-16 shrink-0 md:h-24 md:w-24">
            <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
              <img
                className="bg-token-tertiary h-full w-full"
                alt="GPT Icon"
                width="80"
                height="80"
                src="https://chatgpt.com/backend-api/content?id=file-6qPLxHx8u9lf2XszRtWG25RD&amp;gizmo_id=g-alKfVrz9K&amp;ts=485761&amp;p=gpp&amp;sig=86343ad6ad969057c398f2993c30a4ead779efb589be719985a5753805abdc81&amp;v=0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="line-clamp-2 font-semibold md:text-lg">Canva</div>
            <span className="line-clamp-2 text-xs md:line-clamp-3">
              Effortlessly design anything: presentations, logos, social media
              posts and more.
            </span>
            <div className="text-token-text-tertiary mt-1 line-clamp-1 flex justify-start gap-1 text-xs">
              <div className="flex flex-row items-center space-x-1">
                <div className="text-token-text-tertiary text-xs">
                  작성자: canva.com
                </div>
              </div>
            </div>
          </div>
        </a>
        <a
          className="gizmo-link cursor-pointer group flex h-35 items-center gap-5 overflow-hidden rounded-xl bg-gray-50 px-7 py-8 hover:bg-gray-100"
          href="#"
        >
          <div className="h-16 w-16 shrink-0">
            <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
              <img
                className="bg-token-tertiary h-full w-full"
                alt="GPT Icon"
                width="80"
                height="80"
                src="https://chatgpt.com/backend-api/content?id=file-fGE6EGZCQY73C76MJantfE0d&gizmo_id=g-0S5FXLyFN&ts=485707&p=gpp&sig=11b9bd2ef7c21d15e6834c825b7cc7829b4ecab2738cf328acc651d918869d6a&v=0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-lg">Wolfram</div>
            <span className="text-xs text-token-text-tertiary">
              Access computation, math, chemistry, curated knowledge & real-time
              data from Wolfram|Alpha
            </span>
            <div className="mt-1 text-xs text-token-text-tertiary">
              작성자: wolfram.com
            </div>
          </div>
        </a>
        <a
          className="gizmo-link cursor-pointer group flex h-24 items-center gap-5 overflow-hidden rounded-xl bg-gray-50 px-7 py-8 hover:bg-gray-100 md:h-32 lg:h-36 dark:bg-gray-700 dark:hover:bg-white/10"
          href="#"
        >
          <div className="h-16 w-16 shrink-0 md:h-24 md:w-24">
            <div className="gizmo-shadow-stroke overflow-hidden rounded-full">
              <img
                className="bg-token-tertiary h-full w-full"
                alt="GPT Icon"
                width="80"
                height="80"
                src="https://chatgpt.com/backend-api/content?id=file-6qPLxHx8u9lf2XszRtWG25RD&amp;gizmo_id=g-alKfVrz9K&amp;ts=485761&amp;p=gpp&amp;sig=86343ad6ad969057c398f2993c30a4ead779efb589be719985a5753805abdc81&amp;v=0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="line-clamp-2 font-semibold md:text-lg">Canva</div>
            <span className="line-clamp-2 text-xs md:line-clamp-3">
              Effortlessly design anything: presentations, logos, social media
              posts and more.
            </span>
            <div className="text-token-text-tertiary mt-1 line-clamp-1 flex justify-start gap-1 text-xs">
              <div className="flex flex-row items-center space-x-1">
                <div className="text-token-text-tertiary text-xs">
                  작성자: canva.com
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
