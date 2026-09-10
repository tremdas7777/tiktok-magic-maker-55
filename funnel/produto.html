<!DOCTYPE html>
<html lang="pt">

<head>
    <style>
        .protecao-cliente {
            background: #fff;
            border: none;
            border-radius: 0;
            padding: 10px 14px 10px 14px;
            margin: 10px 0 0 0;
            box-shadow: 0 1px 3px #0001;
        }
        .protecao-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
        }
        .protecao-header .header-left {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 600;
            color: #7a5c00;
            font-size: 13px;
        }
        .protecao-header .header-right {
            display: flex;
            align-items: center;
        }
        .protecao-lista {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 4px 0;
        }
        .protecao-lista li {
            width: 50%;
            color: #333;
            font-size: 12px;
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .protecao-lista li .check {
            color: #7a5c00;
            font-size: 12px;
            font-weight: 700;
            flex-shrink: 0;
        }

        /* Bloco de vídeos dos criadores */
        .creator-videos {
            padding: 16px;
            background: #fff;
            border-top: 1px solid #f0f0f0;
            border-bottom: 1px solid #f0f0f0;
        }
        .creator-videos__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 12px;
        }
        .creator-videos__title {
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #111;
        }
        .creator-videos__subtitle {
            font-size: 13px;
            color: #777;
        }
        .creator-videos__grid {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding: 4px 2px 6px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
        }
        .creator-videos__grid::-webkit-scrollbar {
            height: 6px;
        }
        .creator-videos__grid::-webkit-scrollbar-thumb {
            background: #d0d0d0;
            border-radius: 999px;
        }
        .creator-video-card {
            scroll-snap-align: center;
            width: 130px;
            min-width: 130px;
            border: none;
            border-radius: 8px;
            padding: 0;
            box-shadow: none;
            background: transparent;
            transition: transform 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .creator-video-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.08);
        }
        .creator-video-card h4 {
            margin: 0;
            font-size: 13px;
            font-weight: 600;
            color: #111;
            line-height: 1.3;
        }
        .creator-video-card .meta {
            display: none;
        }
        .creator-video-card .embed-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 9 / 16;
            max-height: 210px;
            border-radius: 8px;
            overflow: hidden;
            background: #0f1116;
        }
        .creator-video-card iframe,
        .creator-video-card video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
            object-fit: cover;
        }
        .creator-video-card__meta-row {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%);
            color: #fff;
        }
        .creator-video-card__avatar {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: #fff;
            color: #111;
            font-size: 9px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 3px 8px rgba(0,0,0,0.18);
        }
        .creator-video-card__avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .creator-video-card__name {
            font-size: 11px;
            color: #fff;
            line-height: 1.2;
            font-weight: 600;
        }

        /* Modal de vídeo em tela cheia */
        .creator-video-modal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 16px;
        }
        .creator-video-modal.is-open { display: flex; }
        .creator-video-modal__content {
            position: relative;
            width: min(90vw, 720px);
            background: #0d0f14;
            border-radius: 14px;
            box-shadow: 0 30px 80px rgba(0,0,0,0.35);
            overflow: hidden;
        }
        .creator-video-modal__media {
            position: relative;
            width: 100%;
            aspect-ratio: 9 / 16;
            background: #0f1116;
        }
        .creator-video-modal__media iframe,
        .creator-video-modal__media video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: 0;
            object-fit: cover;
            z-index: 1;
        }
        .creator-video-modal__cart {
            position: absolute;
            bottom: 52px;
            left: 10px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            padding: 0 8px;
            background: rgba(12, 14, 18, 0.45);
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.18);
            border: 1px solid rgba(255,255,255,0.24);
            gap: 4px;
            z-index: 3;
            pointer-events: auto;
        }
        .creator-video-modal__cart svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }
        .creator-video-modal__cart img {
            width: 14px;
            height: 14px;
            filter: invert(1);
            display: block;
        }
        .creator-video-modal__cart-icon {
            width: 20px;
            height: 20px;
            border-radius: 5px;
            background: #fca14c;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 8px rgba(0,0,0,0.18);
        }
        .creator-video-modal__cart span {
            font-size: 11px;
            line-height: 1;
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .creator-video-modal__profile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px;
            color: #fff;
        }
        .creator-video-modal__profile-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .creator-video-modal__profile-avatar {
            width: 32px;
            height: 32px;
            border-radius: 999px;
            background: #1d1f27;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-weight: 700;
            color: #fff;
            box-shadow: 0 8px 22px rgba(0,0,0,0.22);
            font-size: 12px;
        }
        .creator-video-modal__profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .creator-video-modal__profile-name {
            font-size: 14px;
            font-weight: 600;
        }
        .creator-video-modal__meta {
            display: flex;
            gap: 12px;
            align-items: center;
            font-size: 12px;
            color: #cfd3dc;
        }
        .creator-video-modal__close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 34px;
            height: 34px;
            border-radius: 999px;
            border: none;
            background: rgba(0,0,0,0.4);
            color: #fff;
            font-size: 18px;
            cursor: pointer;
        }
        .creator-videos__empty {
            font-size: 13px;
            color: #777;
            padding: 12px;
            background: #fafafa;
            border: 1px dashed #e4e4e4;
            border-radius: 10px;
            text-align: center;
        }
    /* Garantir layout em coluna e centralização nos cards do carrossel */
    .mais-desta-loja-card {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        padding: 10px 0 14px 0;
        background: none;
        border-radius: 0;
        box-shadow: none;
        min-width: 140px;
        max-width: 160px;
        width: 100%;
        min-height: 340px;
        height: 400px;
        margin: 0 0 0 0;
        position: relative;
    }
    
    /* Override: novo layout compacto dos cards da seção "Mais desta loja" */
    .mais-desta-loja-card {
        display: flex;
        flex-direction: column;
        width: 112px;
        min-width: 112px;
        min-height: 210px;
        height: 210px;
        padding: 0;
        margin: 0;
        background: none !important;
        border: none;
        box-shadow: none !important;
        position: relative;
    }
    .mais-desta-loja-card .img-wrap {
        width: 100%;
        aspect-ratio: 1/1; /* mantém formato quadrado, sem mexer no tamanho configurado */
        position: relative;
        display: block;
        overflow: hidden;
        background: none;
        margin: 0;
        padding: 0;
    }
    .mais-desta-loja-card .img-wrap img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* preenche toda área */
        border-radius: 0 !important;
        display: block;
        margin: 0;
    }
    .mais-desta-loja-card .valores {
        margin-top: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1px;
        position: static; /* abaixo da imagem, sem sobrepor e sem mexer na imagem */
        padding: 6px 0 0 2px; /* padding entre imagem e valores */
    }
    .mais-desta-loja-card .preco {
        font-size: 5px;
        font-weight: 600;
        color: #000000;
        margin: 0;
        text-align: left;
        line-height: 1;
    }
    .mais-desta-loja-card .desconto {
        font-size: 5px;
        font-weight: 600;
        color: #ff2d55;
        margin: 0;
        text-align: left;
        line-height: 1;
        background: #ffe4ee;
        display: inline-block;
        padding: 1px 3px;
        border-radius: 3px;
    }
        

        .reviews-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .reviews-header .title {
            font-size: 15px;
            font-weight: 700;
            color: #222;
        }

        .reviews-header .subtitle {
            font-size: 12px;
            color: #888;
            margin-top: 1px;
        }

        .reviews-header .chev {
            color: #bbb;
            margin-left: 8px;
            display: flex;
            align-items: center;
        }

        .pills {
            display: flex;
            gap: 7px;
            flex-wrap: nowrap;
            overflow-x: auto;
            margin-bottom: 0;
            scrollbar-width: none;
        }

        .pills::-webkit-scrollbar {
            display: none;
        }

        .pill {
            white-space: nowrap;
        }

        .pill {
            display: flex;
            align-items: center;
            background: #f8f8fa;
            border-radius: 7px;
            padding: 4px 10px;
            font-size: 13px;
            color: #222;
            box-shadow: none;
            gap: 6px;
            min-width: 0;
            cursor: pointer;
            border: 1px solid #ededed;
            transition: box-shadow .18s, border .18s;
        }

        .pill:active,
        .pill:focus {
            border: 1.5px solid #ff2d55;
            box-shadow: 0 2px 8px #ff2d5522;
        }

        .media-pill svg {
            width: 18px;
            height: 18px;
            margin-right: 3px;
        }

        .star-pill .badge {
            display: flex;
            align-items: center;
            gap: 2px;
            background: none;
            color: #222;
            font-weight: 700;
            border-radius: 0;
            padding: 0;
            font-size: 13px;
        }

        .star-pill .badge svg {
            margin-right: 3px;
            width: 15px;
            height: 15px;
            fill: #ffc107;
            flex-shrink: 0;
        }

        .star-pill .count {
            color: #888;
            font-size: 13px;
            margin-left: 4px;
        }

        @media (max-width: 500px) {
            .reviews-card {
                max-width: 98vw;
                padding: 0 2vw 8px 2vw;
            }
        }
    </style>
    <style>
        .save-btn-wrap {
            position: relative;
            display: inline-block;
        }

        .save-btn-wrap img {
            transition: filter .2s;
            position: relative;
            z-index: 2;
        }

        /* Nenhum efeito visual no ícone de salvar */
    </style>
    <!-- TikTok Pixel Code Start (REMOVIDO: código corrompido) -->
    <!-- TikTok Pixel Code End -->
    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "t9udqznhez");
    </script>

    <!-- Tailwind -->
    <script>if(!window._twLoaded){window._twLoaded=1;document.write('<scr\x69pt src="https://cdn.tailwindcss.com/"><\/scr\x69pt>');}</script>
    <script>window.LANG={"account":"Conta","add_more_for_free_shipping":"Adicione mais produtos para liberar o frete grátis.","add_to_cart":"Adicionar ao Carrinho","add_to_favorites":"Adicionar aos favoritos","add_to_order":"Adicionar ao pedido","added_to_cart":"Adicionado ao carrinho","added_to_favorites":"Produto adicionado aos favoritos","added_to_order":"Adicionado ao pedido","address":"Endereço","affiliates":"Afiliados","ai_summary":"Resumo de opiniões gerado por IA","album_and_pack_added":"Álbum e pacote adicionados ao carrinho.","all":"Tudo","already_in_cart":"Este produto já está no seu carrinho.","applied_discounts":"Descontos aplicados","arrives_by":"Receba até {date}","arrives_tomorrow":"Chega amanhã!","auto_refund_damages":"Reembolso automático por danos","back":"Voltar","back_to_home":"Voltar para a página inicial","back_to_top":"Voltar ao topo","best_seller":"MAIS VENDIDO","best_seller_pill":"MAIS VENDIDO","best_selling":"Mais vendidos","brands_featured":"Marcas em destaque","buy_now":"Comprar","buy_now_cta":"Comprar agora","buy_sell_with_app":"Compre e venda com o app!","cancel":"Cancelar","cart":"Carrinho","cart_empty":"Seu carrinho está vazio.","cart_summary":"Resumo do carrinho","categories":"Categorias","categories_coming_soon":"Em breve categorias e filtros.","checkout":"FINALIZAR COMPRA","choose_quantity":"Escolha quantidade","city":"Cidade","close":"Fechar","color":"Cor","complement":"Complemento (opcional)","contact":"Contato","continue_checkout":"Continuar","continue_shopping":"Continuar comprando","copy_coupon_error":"Não foi possível copiar o cupom.","copy_link":"Copiar Link","copy_pix":"COPIAR CÓDIGO PIX","coupon_copied":"Cupom \"{code}\" copiado!","coupon_expired":"O cupom expirou","coupon_expires":"O cupom expira em {time}","coupon_free_shipping":"Cupom de frete grátis","coupon_late_pickup":"Cupom por atraso na coleta","cpf_cnpj":"CPF \/ CNPJ","create_account":"Crie a sua conta","creator":"Criador","creator_video":"Vídeo do criador","creator_videos":"Vídeos dos criadores","creator_videos_subtitle":"Conteúdo enviado por quem testou","customer_protection":"Proteção do cliente","customer_reviews_count":"Avaliações dos clientes ({n})","data_privacy_notice":"Seus dados são tratados conforme a legislação vigente e usados apenas para processar pedidos e atendimento.","day_ago":"Há 1 dia","days_ago":"Há {n} dias","default_variation":"Padrão","delivery":"Entrega","description":"Descrição","differentials":"Diferenciais","discount":"Desconto","discounts":"Descontos","email":"E-mail","encrypted_data":"Dados criptografados","ends_in":"Termina em {time}","err_cnpj_invalid":"CNPJ inválido. Verifique o número.","err_cpf_invalid":"CPF inválido. Verifique o número.","err_cpf_required":"Informe CPF ou CNPJ.","err_ddd_invalid":"DDD inválido.","err_email_invalid":"E-mail inválido. Ex: nome@dominio.com","err_email_required":"Informe seu e-mail.","err_name_required":"Informe seu nome completo.","err_name_surname":"Digite nome e sobrenome.","err_number_required":"Informe o número.","err_phone_incomplete":"Telefone incompleto. Use (DDD) + número.","err_phone_required":"Informe seu telefone.","err_zip_digits":"CEP deve ter 8 dígitos.","err_zip_invalid":"CEP inválido ou não encontrado.","extra_item_added":"Item adicional adicionado ao carrinho.","extra_item_in_cart":"Esse item já está no carrinho.","favorites":"Favoritos","flash_sale":"Oferta Relâmpago","follow":"Seguir","followers":"Seguidores","following":"Seguindo","free":"GRÁTIS","free_return":"Devolução grátis. Você tem 30 dias a partir da data de recebimento.","free_return_label":"Devolução gratuita","free_returns_label":"Devoluções gratuitas em 30 dias • Cancelamento fácil","free_ship_first_add":"Aproveite o frete grátis na sua primeira compra adicionando mais produtos","free_shipping":"Frete grátis","free_shipping_above":"FRETE GRÁTIS ACIMA DE R$ {value}","free_shipping_activated":"Frete grátis ativado","free_shipping_arrive":"Frete grátis — chega {date}","free_shipping_first":"Frete grátis por ser sua primeira compra","free_shipping_missing":"Faltam R$ {amount} para liberar o frete grátis.","free_shipping_unlocked":"Frete grátis liberado no checkout!","full_name":"Nome completo","gift_exchange":"Vale-troca para presente","gift_exchange_text":"A pessoa que o receber poderá trocá-lo.","go_to_delivery":"Ir para entrega","go_to_payment":"Ir para pagamento","gratis":"Grátis","guarantee_return":"Garantir a devolução caso necessário","guarantee_text":"Receba o produto que está esperando ou devolvemos o dinheiro.","guaranteed_purchase":"Compra Garantida","helpful":"Útil","history":"Histórico","home":"Início","home_tab":"Página inicial","hour_ago":"Há 1 hora","hours_ago":"Há {n} horas","identification":"Identificação","image_load_error":"Erro ao carregar imagem","in_stock":"Estoque disponível","includes_media":"Inclui imagens ou vídeos","insert_coupon":"Inserir código do cupom","installments":"em {n}× R$ {value} sem juros","item_label":"Item:","learn_more":"Saiba mais","likes_count":"{n} curtidas","link_copied":"Link copiado!","loading":"Carregando...","loading_shipping":"Carregando fretes...","login":"Entre","main_products":"Principais produtos","message":"Mensagem","ml_card_badge":"CARTÃO","ml_free_ship_subtitle":"em milhares de produtos","ml_installment_payment":"Pagamento parcelado","ml_offer_badge":"OFERTA","ml_secure_purchase":"Compra 100% segura","ml_shipping_badge":"ENVIO","ml_twelve_installments":"12x sem juros","ml_via_card":"no cartão","money_back":"Receba o produto que está esperando ou devolvemos o dinheiro.","month_ago":"Há 1 mês","months_ago":"Há {n} meses","more_delivery_details":"Mais detalhes e formas de entrega","more_from_store":"Mais desta loja","my_account":"Minha conta","n_options_available":"{n} opções disponíveis","neighborhood":"Bairro","new":"Novo","new_arrivals":"Lançamentos","no_comments":"Sem comentário.","no_comments_available":"Nenhum comentário disponível.","no_creator_videos":"Nenhum vídeo de criador disponível no momento.","no_description":"Sem descrição cadastrada.","no_image":"Sem imagem","no_interest":"sem juros","no_minimum_spend":"Sem gasto mínimo","no_products_found":"Nenhum produto encontrado.","no_products_now":"Nenhum produto disponível no momento.","no_reviews_yet":"Nenhuma avaliação ainda.","no_shipping_options":"Nenhuma opção de frete disponível.","no_variations":"Este produto não possui variações cadastradas.","now_following":"Agora você está seguindo a conta desta loja no TikTok","number":"Número","offer_ends_in":"Oferta termina em","offer_irresistible":"OFERTA IMPERDÍVEL","offer_redeemed":"Oferta resgatada com sucesso!","offers":"Ofertas","official_store":"Loja Oficial","official_stores":"Lojas oficiais","on_delivery":"Entrega no prazo","on_selected_products":"Em produtos selecionados","on_time_delivery":"Entrega no prazo","open_cart":"Abrir carrinho","order_summary":"Resumo do Pedido","out_of_stock":"Esgotado","overview":"Visão geral","payment":"Pagamento","payment_method":"Forma de pagamento","perfect_for_pct":"Perfeito para {pct}%","phone":"Telefone \/ WhatsApp","photo_reviews":"Opiniões com fotos","pix_cash":"PIX à vista","pix_charge_error":"Falha ao gerar cobrança Pix.","pix_copied":"CÓDIGO COPIADO!","pix_copy_error":"Erro ao copiar o código PIX.","pix_error":"Não foi possível gerar o Pix. Tente novamente.","pix_invalid_response":"Resposta inválida do provedor Pix.","pix_unavailable":"Código PIX não disponível.","policies_privacy":"Políticas e Privacidade","preparing_purchase":"Preparando tudo para\nsua compra","price_filter":"Preço","privacy_policy":"Política de Privacidade","processing":"Processando...","product":"Produto","product_description":"Descrição do Produto","product_image":"Imagem do Produto","product_image_fullscreen":"Imagem do produto em tela cheia","product_not_found":"Produto não encontrado.","products":"Produtos","products_load_error":"Erro ao carregar produtos.","promotion":"Promoção","purchases":"Compras","quantity":"Quantidade","rating_aria":"Avaliação {nota} de 5. {n} opiniões.","read_less":"Ler menos","recently":"Recentemente","recommendations":"Recomendações","recommended":"Recomendado para você","recommended_filter":"Recomendado","redeem":"Resgatar","redeem_free_shipping":"Resgatar frete grátis","redeem_now":"Resgatar agora","redeem_offer":"Resgatar Oferta","redeemed":"Oferta resgatada","related_products":"Produtos relacionados","report":"Denunciar","reviews":"Opiniões do produto","reviews_short":"Opiniões","reviews_summary":"Resumo e classificação dos clientes","sales":"Vendas","save_percent_with":"Economize {n}% com","saving_amount":"Você está economizando {amount} neste pedido.","search":"Buscar","search_placeholder":"Digite o que você quer encontrar","search_results":"Resultados: \"{q}\"","search_terms":"Termos mais procurados","searching":"Estou buscando...","searching_zip":"Buscando CEP...","secure_payment":"Pagamento 100% seguro","see_all":"Ver todos","see_full_description":"Ver descrição completa","see_less":"Ver menos","see_more":"Ver mais","see_options":"Ver opções","see_payment_methods":"Ver os meios de pagamento","see_products":"Ver produtos","select_color":"Selecione a cor...","select_color_first":"Selecione a cor para continuar.","select_min_item":"Selecione pelo menos 1 item para continuar","select_shipping":"Selecione o frete","select_shipping_first":"Selecione um frete antes de finalizar.","select_size":"Selecione o tamanho...","select_variation":"Selecione uma especificação","select_variation_first":"Selecione uma variação para continuar.","sell":"Vender","seller":"Vendedor","send_receipt":"Enviar o comprovante de compra","share":"Compartilhar","shipping":"Frete","shipping_fee_label":"Taxa de envio: {value}","shipping_load_error":"Não foi possível carregar as opções de frete.","shipping_paid_arrive":"Frete: R$ {value} — chega {date}","show_all_reviews":"Mostrar todas as opiniões","show_more_categories":"Mostrar mais categorias","size":"Tamanho","size_guide":"Guia de tamanhos","sold_by":"Vendido por","sold_count":"{n} vendido(s)","some_items_already_in_cart":"Alguns itens já estavam no carrinho.","sort_price_desc":"Ordenando por preço: maior para menor.","state":"Estado","stock_available":"Estoque disponível","store":"Loja","store_reviews":"Avaliações da loja","stores":"Lojas","subtotal":"Subtotal","taxes_included":"Impostos inclusos","tech_specs":"Especificações Técnicas","thumbnail":"Miniatura","to_define":"A definir","today":"Hoje","total":"Total","total_calc_error":"Não foi possível calcular o total do pedido.","track_order":"Acompanhar o andamento do pedido","unavailable":"Indisponível","unique_color":"Cor única","unique_size":"Tamanho único","unit_plural":"{n} unidades","unit_singular":"1 unidade","user":"Usuário","variations":"Variações","view_grid":"Visualizar em bloco","view_list":"Visualizar em lista","want_this":"Quero esse item","warranty":"Garantia","week_ago":"Há 1 semana","weeks_ago":"Há {n} semanas","welcome_to":"Bem-vindo à","why_we_need":"Por que precisamos desses dados?","won_free_shipping":"Você ganhou frete grátis!","your_cart":"Seu Carrinho","zip_autofilled":"Endereço preenchido automaticamente.","zip_code":"CEP","zoom_image":"Ampliar imagem"};window.t=function(k,v){var s=window.LANG[k]||k;if(v)Object.keys(v).forEach(function(p){s=s.replace(new RegExp('{'+p+'}','g'),v[p]);});return s;};</script>
    <script>window.EXIBIR_TAG_OFICIAL = true;window.EXIBIR_TAG_TORCER = true;</script>
    <script>
      window.voltarLoja = function (e) {
        if (e) e.preventDefault();
        if (location.protocol !== 'file:' && window.history.length > 1 && document.referrer) {
          try {
            if (document.referrer.indexOf(location.origin) === 0) {
              history.back();
              return false;
            }
          } catch (err) {}
        }
        location.href = 'index.html';
        return false;
      };
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Shop</title>
    <style>
        /* Modal CSS */
        .oferta-badge-wrap { box-shadow: none; }
        .toast-center { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(.9); min-width: 270px; max-width: 88vw; background: rgba(25,25,25,0.92); color: #fff; padding: 22px 24px 18px; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,.28); z-index: 9999; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; transition: opacity .2s ease, transform .2s ease; pointer-events: none; text-align: center; }
        .toast-center.show { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        .toast-icon { display: flex; align-items: center; justify-content: center; }
        .toast-icon svg { width: 44px; height: 44px; stroke: #fff; stroke-width: 2; }
        .toast-text { font-size: 14px; font-weight: 600; color: #fff; line-height: 1.35; }
        .dots-line { position: relative; width: 44px; height: 12px; }
        .dots-line .dot { position: absolute; top: 2px; width: 10px; height: 10px; border-radius: 50%; opacity: .9; }
        .dots-line .dot.dot-red { left: 0; background: #fe2d55; animation: slide-right .9s ease-in-out infinite; }
        .dots-line .dot.dot-cyan { right: 0; background: #00f2ea; animation: slide-left .9s ease-in-out infinite; }
        @keyframes slide-right { 0% { transform: translateX(0); opacity:.6;} 50% { transform: translateX(18px); opacity:1;} 100% { transform: translateX(0); opacity:.6;} }
        @keyframes slide-left { 0% { transform: translateX(0); opacity:.6;} 50% { transform: translateX(-18px); opacity:1;} 100% { transform: translateX(0); opacity:.6;} }
        #buy-positions { position: sticky; bottom: 0; left: 0; right: 0; z-index: 30; background: transparent; box-shadow: none; padding: 18px 16px calc(12px + env(safe-area-inset-bottom)); margin-top: 0; }
        .chatsw { margin-bottom: 3em !important; }
        #grid-variacoes p { color: #333; }

        .variation-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            width: 120px;
            flex: 0 0 auto;
            padding: 0;
            border: 1px solid #d1d5db;
            border-radius: 16px;
            background: #f3f4f6;
            box-shadow: none;
            position: relative;
            cursor: pointer;
            transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
            overflow: hidden;
        }

        .variation-card.is-size {
            width: auto;
            min-width: 56px;
        }

        .variation-card.is-size .variation-image-wrap {
            display: none;
        }

        .variation-card.is-size .variation-label-wrap {
            min-height: unset;
            padding: 10px 14px;
        }

        .variation-card.is-size .variation-label {
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            line-height: 1.3;
            display: block;
            overflow: visible;
        }

        .variation-card:hover {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .variation-card.is-selected {
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
        }

        .variation-card.is-selected::after {
            content: '';
            position: absolute;
            inset: 0;
            border: 2px solid #fb7185;
            border-radius: 16px;
            pointer-events: none;
        }

        .variation-row-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        .variation-row-grid .variation-card { width: 100%; flex: none; }
        .variation-row {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 6px;
            margin-bottom: 8px;
            scroll-snap-type: x proximity;
        }

        .variation-row::-webkit-scrollbar {
            display: none;
        }

        .variation-row {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .variation-image-wrap {
            width: 100%;
            height: 100px;
            border-radius: 0;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
            padding: 6px;
            box-sizing: border-box;
        }

        .variation-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .variation-label-wrap {
            width: 100%;
            background: #fff;
            border-top: 1px solid #e5e7eb;
            padding: 6px 4px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 32px;
            box-sizing: border-box;
        }

        .variation-label {
            font-size: 12px;
            font-weight: 600;
            color: #111827;
        }

        .variation-zoom {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 22px;
            height: 22px;
            border-radius: 999px;
            border: none;
            background: rgba(156, 163, 175, 0.9);
            color: #fff;
            font-size: 10px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .fullscreen-modal {
            z-index: 100000 !important;
        }

        /* Toast minimal para feedback central (compatível com o index) */
        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #3498db;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

        /* Loader de bolinhas deslizantes (vermelho e ciano) */
        .dots-line {
            position: relative;
            width: 28px;
            height: 10px;
        }

        .dots-line .dot {
            position: absolute;
            top: 1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: .95;
        }

        .dots-line .dot.dot-red {
            left: 0;
            background: #fe2d55;
            animation: slide-right .9s ease-in-out infinite;
        }

        .dots-line .dot.dot-cyan {
            right: 0;
            background: #00f2ea;
            animation: slide-left .9s ease-in-out infinite;
        }

        @keyframes slide-right {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }

        @keyframes slide-left {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(-10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }
    </style>
    <style>
        .mais-desta-loja-carousel {
            display: flex;
            gap: 0.7rem;
            overflow-x: auto;
            padding-bottom: 0.3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .mais-desta-loja-carousel::-webkit-scrollbar {
            display: none;
        }

        .mais-desta-loja-card {
            width: 120px;
            min-width: 120px;
            max-width: 120px;
            min-height: 160px;
            height: 160px;
            background: #fff;
            border-radius: 0.8rem;
            box-shadow: 0 2px 8px #0001;
            padding: 0.5rem;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            transition: box-shadow 0.2s, transform 0.2s;
            cursor: pointer;
        }

        .mais-desta-loja-card:hover {
            box-shadow: 0 6px 18px #ff2d5522, 0 2px 8px #0002;
            transform: translateY(-2px) scale(1.025);
        }

        .mais-desta-loja-card img {
            border-radius: 0.6rem;
            margin-bottom: 0.3rem;
            width: 100%;
            height: 70px;
            object-fit: cover;
            background: #f7f7f7;
        }

        .mais-desta-loja-card p {
            margin: 0;
            font-size: 13px;
            text-align: center;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mais-desta-loja-card .preco {
            color: #000000;
            font-weight: bold;
            font-size: 0.98rem;
        }

        .mais-desta-loja-card .desconto {
            color: #ff2d55;
            font-size: 0.8rem;
            background: #ffe4ee;
            display: inline-block;
            padding: 2px 6px;
            border-radius: 6px;
        }

        .mais-desta-loja-section {
            max-width: 520px;
            margin: 0 auto;
            padding: 12px 0 8px 0;
        }
    </style>
    <!-- TikTok Pixel Code Start (REMOVIDO: código corrompido) -->
    <!-- TikTok Pixel Code End -->
    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "t9udqznhez");
    </script>

    <!-- Tailwind -->
    <script>if(!window._twLoaded){window._twLoaded=1;document.write('<scr\x69pt src="https://cdn.tailwindcss.com/"><\/scr\x69pt>');}</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Shop</title>
    <style>
        /* Deixa o CTA do modal flutuando (sticky) como no index + compat iOS */
        #buy-positions {
            position: -webkit-sticky;
            /* iOS Safari */
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 30;
            background: #ffffff;
            /* sólido para não vazar o fundo */
            box-shadow: none;
            padding-top: 18px;
            padding-right: 16px;
            padding-left: 16px;
            padding-bottom: 12px;
            /* fallback */
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            /* iOS safe area */
            margin-top: 0;
            border-radius: 0 !important;
            text-transform: uppercase;
        }

        /* Toast minimal para feedback central (compatível com o index) */
        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #3498db;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

        /* Loader de bolinhas deslizantes (vermelho e ciano) */
        .dots-line {
            position: relative;
            width: 28px;
            height: 10px;
        }

        .dots-line .dot {
            position: absolute;
            top: 1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: .95;
        }

        .dots-line .dot.dot-red {
            left: 0;
            background: #fe2d55;
            animation: slide-right .9s ease-in-out infinite;
        }

        .dots-line .dot.dot-cyan {
            right: 0;
            background: #00f2ea;
            animation: slide-left .9s ease-in-out infinite;
        }

        @keyframes slide-right {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }

        @keyframes slide-left {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(-10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }
    </style>
    <style>
        .mais-desta-loja-carousel {
            display: flex;
            gap: 0.7rem;
            overflow-x: auto;
            padding-bottom: 0.3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .mais-desta-loja-carousel::-webkit-scrollbar {
            display: none;
        }

        .mais-desta-loja-card {
            width: 120px;
            min-width: 120px;
            max-width: 120px;
            min-height: 160px;
            height: 160px;
            background: #fff;
            border-radius: 0.8rem;
            box-shadow: 0 2px 8px #0001;
            padding: 0.5rem;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            transition: box-shadow 0.2s, transform 0.2s;
            cursor: pointer;
        }

        .mais-desta-loja-card:hover {
            box-shadow: 0 6px 18px #ff2d5522, 0 2px 8px #0002;
            transform: translateY(-2px) scale(1.025);
        }

        .mais-desta-loja-card img {
            border-radius: 0.6rem;
            margin-bottom: 0.3rem;
            width: 100%;
            height: 70px;
            object-fit: cover;
            background: #f7f7f7;
        }

        .mais-desta-loja-card p {
            margin: 0;
            font-size: 13px;
            text-align: center;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mais-desta-loja-card .preco {
            color: #ff2d55;
            font-weight: bold;
            font-size: 0.98rem;
        }

        .mais-desta-loja-card .desconto {
            color: #aaa;
            font-size: 0.8rem;
        }

        .mais-desta-loja-section {
            max-width: 520px;
            margin: 0 auto;
            padding: 12px 0 8px 0;
        }
    </style>
    <!-- TikTok Pixel Code Start (REMOVIDO: código corrompido) -->
    <!-- TikTok Pixel Code End -->
    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "t9udqznhez");
    </script>

    <!-- Tailwind -->
    <script>if(!window._twLoaded){window._twLoaded=1;document.write('<scr\x69pt src="https://cdn.tailwindcss.com/"><\/scr\x69pt>');}</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Shop</title>
    <style>
        /* Deixa o CTA do modal flutuando (sticky) como no index + compat iOS */
        #buy-positions {
            position: -webkit-sticky;
            /* iOS Safari */
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 30;
            background: #ffffff;
            /* sólido para não vazar o fundo */
            box-shadow: none;
            padding-top: 18px;
            padding-right: 16px;
            padding-left: 16px;
            padding-bottom: 12px;
            /* fallback */
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            /* iOS safe area */
            margin-top: 0;
            border-radius: 0 !important;
            text-transform: uppercase;
        }

        /* Toast minimal para feedback central (compatível com o index) */
        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #3498db;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

        /* Loader de bolinhas deslizantes (vermelho e ciano) */
        .dots-line {
            position: relative;
            width: 28px;
            height: 10px;
        }

        .dots-line .dot {
            position: absolute;
            top: 1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: .95;
        }

        .dots-line .dot.dot-red {
            left: 0;
            background: #fe2d55;
            animation: slide-right .9s ease-in-out infinite;
        }

        .dots-line .dot.dot-cyan {
            right: 0;
            background: #00f2ea;
            animation: slide-left .9s ease-in-out infinite;
        }

        @keyframes slide-right {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }

        @keyframes slide-left {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(-10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }
    </style>
    <style>
        .mais-desta-loja-carousel {
            display: flex;
            gap: 0.7rem;
            overflow-x: auto;
            padding-bottom: 0.3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .mais-desta-loja-carousel::-webkit-scrollbar {
            display: none;
        }

        .mais-desta-loja-card {
            width: 120px;
            min-width: 120px;
            max-width: 120px;
            min-height: 160px;
            height: 160px;
            background: #fff;
            border-radius: 0.8rem;
            box-shadow: 0 2px 8px #0001;
            padding: 0.5rem;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            transition: box-shadow 0.2s, transform 0.2s;
            cursor: pointer;
        }

        .mais-desta-loja-card:hover {
            box-shadow: 0 6px 18px #ff2d5522, 0 2px 8px #0002;
            transform: translateY(-2px) scale(1.025);
        }

        .mais-desta-loja-card img {
            border-radius: 0.6rem;
            margin-bottom: 0.3rem;
            width: 100%;
            height: 70px;
            object-fit: cover;
            background: #f7f7f7;
        }

        .mais-desta-loja-card p {
            margin: 0;
            font-size: 13px;
            text-align: center;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mais-desta-loja-card .preco {
            color: #ff2d55;
            font-weight: bold;
            font-size: 0.98rem;
        }

        .mais-desta-loja-card .desconto {
            color: #aaa;
            font-size: 0.8rem;
        }

        .mais-desta-loja-section {
            max-width: 520px;
            margin: 0 auto;
            padding: 12px 0 8px 0;
        }
    </style>
    <!-- TikTok Pixel Code Start (REMOVIDO: código corrompido) -->
    <!-- TikTok Pixel Code End -->
    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "t9udqznhez");
    </script>

    <!-- Tailwind -->
    <script>if(!window._twLoaded){window._twLoaded=1;document.write('<scr\x69pt src="https://cdn.tailwindcss.com/"><\/scr\x69pt>');}</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Shop</title>
    <style>
        /* Deixa o CTA do modal flutuando (sticky) como no index + compat iOS */
        #buy-positions {
            position: -webkit-sticky;
            /* iOS Safari */
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 30;
            background: #ffffff;
            /* sólido para não vazar o fundo */
            box-shadow: none;
            padding-top: 18px;
            padding-right: 16px;
            padding-left: 16px;
            padding-bottom: 12px;
            /* fallback */
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            /* iOS safe area */
            margin-top: 0;
            border-radius: 0 !important;
            text-transform: uppercase;
        }

        /* Toast minimal para feedback central (compatível com o index) */
        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #3498db;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

        /* Loader de bolinhas deslizantes (vermelho e ciano) */
        .dots-line {
            position: relative;
            width: 28px;
            height: 10px;
        }

        .dots-line .dot {
            position: absolute;
            top: 1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: .95;
        }

        .dots-line .dot.dot-red {
            left: 0;
            background: #fe2d55;
            animation: slide-right .9s ease-in-out infinite;
        }

        .dots-line .dot.dot-cyan {
            right: 0;
            background: #00f2ea;
            animation: slide-left .9s ease-in-out infinite;
        }

        @keyframes slide-right {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }

        @keyframes slide-left {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(-10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }
    </style>
    <style>
        .mais-desta-loja-carousel {
            display: flex;
            gap: 0.7rem;
            overflow-x: auto;
            padding-bottom: 0.3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .mais-desta-loja-carousel::-webkit-scrollbar {
            display: none;
        }

        .mais-desta-loja-card {
            width: 120px;
            min-width: 120px;
            max-width: 120px;
            min-height: 160px;
            height: 160px;
            background: #fff;
            border-radius: 0.8rem;
            box-shadow: 0 2px 8px #0001;
            padding: 0.5rem;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            transition: box-shadow 0.2s, transform 0.2s;
            cursor: pointer;
        }

        .mais-desta-loja-card:hover {
            box-shadow: 0 6px 18px #ff2d5522, 0 2px 8px #0002;
            transform: translateY(-2px) scale(1.025);
        }

        .mais-desta-loja-card img {
            border-radius: 0.6rem;
            margin-bottom: 0.3rem;
            width: 100%;
            height: 70px;
            object-fit: cover;
            background: #f7f7f7;
        }

        .mais-desta-loja-card p {
            margin: 0;
            font-size: 13px;
            text-align: center;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mais-desta-loja-card .preco {
            color: #ff2d55;
            font-weight: bold;
            font-size: 0.98rem;
        }

        .mais-desta-loja-card .desconto {
            color: #aaa;
            font-size: 0.8rem;
        }

        .mais-desta-loja-section {
            max-width: 520px;
            margin: 0 auto;
            padding: 12px 0 8px 0;
        }
    </style>
    <!-- TikTok Pixel Code Start (REMOVIDO: código corrompido) -->
    <!-- TikTok Pixel Code End -->
    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "t9udqznhez");
    </script>

    <!-- Tailwind -->
    <script>if(!window._twLoaded){window._twLoaded=1;document.write('<scr\x69pt src="https://cdn.tailwindcss.com/"><\/scr\x69pt>');}</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Shop</title>
    <style>
        /* Deixa o CTA do modal flutuando (sticky) como no index + compat iOS */
        #buy-positions {
            position: -webkit-sticky;
            /* iOS Safari */
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 30;
            background: #ffffff;
            /* sólido para não vazar o fundo */
            box-shadow: none;
            padding-top: 18px;
            padding-right: 16px;
            padding-left: 16px;
            padding-bottom: 12px;
            /* fallback */
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            /* iOS safe area */
            margin-top: 0;
            border-radius: 0 !important;
            text-transform: uppercase;
        }

        /* Toast minimal para feedback central (compatível com o index) */
        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #3498db;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

        /* Loader de bolinhas deslizantes (vermelho e ciano) */
        .dots-line {
            position: relative;
            width: 28px;
            height: 10px;
        }

        .dots-line .dot {
            position: absolute;
            top: 1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: .95;
        }

        .dots-line .dot.dot-red {
            left: 0;
            background: #fe2d55;
            animation: slide-right .9s ease-in-out infinite;
        }

        .dots-line .dot.dot-cyan {
            right: 0;
            background: #00f2ea;
            animation: slide-left .9s ease-in-out infinite;
        }

        @keyframes slide-right {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }

        @keyframes slide-left {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(-10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }
    </style>
    <style>
        .mais-desta-loja-carousel {
            display: flex;
            gap: 0.7rem;
            overflow-x: auto;
            padding-bottom: 0.3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .mais-desta-loja-carousel::-webkit-scrollbar {
            display: none;
        }

        .mais-desta-loja-card {
            width: 120px;
            min-width: 120px;
            max-width: 120px;
            min-height: 160px;
            height: 160px;
            background: #fff;
            border-radius: 0.8rem;
            box-shadow: 0 2px 8px #0001;
            padding: 0.5rem;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            transition: box-shadow 0.2s, transform 0.2s;
            cursor: pointer;
        }

        .mais-desta-loja-card:hover {
            box-shadow: 0 6px 18px #ff2d5522, 0 2px 8px #0002;
            transform: translateY(-2px) scale(1.025);
        }

        .mais-desta-loja-card img {
            border-radius: 0.6rem;
            margin-bottom: 0.3rem;
            width: 100%;
            height: 70px;
            object-fit: cover;
            background: #f7f7f7;
        }

        .mais-desta-loja-card p {
            margin: 0;
            font-size: 13px;
            text-align: center;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mais-desta-loja-card .preco {
            color: #ff2d55;
            font-weight: bold;
            font-size: 0.98rem;
        }

        .mais-desta-loja-card .desconto {
            color: #aaa;
            font-size: 0.8rem;
        }

        .mais-desta-loja-section {
            max-width: 520px;
            margin: 0 auto;
            padding: 12px 0 8px 0;
        }
    </style>
    <!-- TikTok Pixel Code Start (REMOVIDO: código corrompido) -->
    <!-- TikTok Pixel Code End -->
    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "t9udqznhez");
    </script>

    <!-- Tailwind -->
    <script>if(!window._twLoaded){window._twLoaded=1;document.write('<scr\x69pt src="https://cdn.tailwindcss.com/"><\/scr\x69pt>');}</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Shop</title>
    <link href="stylesss.css?v=1788753804" rel="stylesheet">
    <style>
        /* Deixa o CTA do modal flutuando (sticky) como no index + compat iOS */
        #buy-positions {
            position: -webkit-sticky;
            /* iOS Safari */
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 30;
            background: #ffffff;
            /* sólido para não vazar o fundo */
            box-shadow: none;
            padding-top: 18px;
            padding-right: 16px;
            padding-left: 16px;
            padding-bottom: 12px;
            /* fallback */
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            /* iOS safe area */
            margin-top: 0;
            border-radius: 0 !important;
            text-transform: uppercase;
        }

        /* Toast minimal para feedback central (compatível com o index) */
        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #3498db;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

        /* Loader de bolinhas deslizantes (vermelho e ciano) */
        .dots-line {
            position: relative;
            width: 28px;
            height: 10px;
        }

        .dots-line .dot {
            position: absolute;
            top: 1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: .95;
        }

        .dots-line .dot.dot-red {
            left: 0;
            background: #fe2d55;
            animation: slide-right .9s ease-in-out infinite;
        }

        .dots-line .dot.dot-cyan {
            right: 0;
            background: #00f2ea;
            animation: slide-left .9s ease-in-out infinite;
        }

        @keyframes slide-right {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }

        @keyframes slide-left {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }

            50% {
                transform: translate3d(-10px, 0, 0);
                opacity: 1;
            }

            100% {
                transform: translate3d(0, 0, 0);
                opacity: .65;
            }
        }
    </style>
    <script>
        const __previewVersion = (function () {
            try {
                const url = new URL(window.location.href);
                return (url.searchParams.get('v') || '').trim();
            } catch (e) {
                return '';
            }
        })();

        function withCacheBust(url) {
            const value = String(url || '').trim();
            if (!value || !__previewVersion) return value;
            if (value.startsWith('data:') || value.startsWith('blob:')) return value;
            if (value.includes('v=')) return value;
            return value + (value.includes('?') ? '&' : '?') + 'v=' + encodeURIComponent(__previewVersion);
        }

        const FALLBACK_MEDIA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

        // Atualiza o badge do carrinho no header
        function updateCartCounter() {
            const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
            const total = carrinho.reduce((acc, item) => acc + (Number(item.quantidade) || 1), 0);
            const el = document.getElementById('cart-count-header');
            if (el) {
                el.textContent = total;
                el.style.display = total > 0 ? 'flex' : 'none';
            }
        }
        // Inicializa o counter ao carregar a página
        document.addEventListener('DOMContentLoaded', function() { updateCartCounter(); });

        let _countdownSecs = 20 * 60;
        function _fmtCountdown(s) {
            const m = String(Math.floor(s/60)).padStart(2,'0');
            const ss = String(s%60).padStart(2,'0');
            return '00:' + m + ':' + ss;
        }
        setInterval(function() {
            if (_countdownSecs > 0) _countdownSecs--;
            const t = _fmtCountdown(_countdownSecs);
            document.querySelectorAll('.oferta-timer').forEach(function(el){ el.textContent = t; });
        }, 1000);

        function isPlaceholderHost(url) {
            const value = String(url || '').toLowerCase();
            if (!value || value.startsWith('data:') || value.startsWith('blob:')) return false;
            return value.includes('placeholder') || value.includes('placehold') || value.includes('dummyimage.com');
        }

        // Normaliza paths de mídia para aceitar com ou sem barra inicial
        function resolveMediaPath(path) {
            if (!path) return FALLBACK_MEDIA;
            const trimmed = String(path).trim();
            if (!trimmed || isPlaceholderHost(trimmed)) return FALLBACK_MEDIA;
            if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) return trimmed;
            if (trimmed.startsWith('/')) return withCacheBust(trimmed);
            return withCacheBust('/' + trimmed.replace(/^\.\/+/, '').replace(/^\/+/, ''));
        }
        function normalizeFotoList(list) {
            if (!list) return [];
            let arr = list;
            if (typeof list === 'string') {
                try { arr = JSON.parse(list); } catch (e) { arr = [list]; }
            }
            if (!Array.isArray(arr)) arr = [arr];
            const seen = new Set();
            return arr
                .map(resolveMediaPath)
                .filter((url) => {
                    if (!url || url === FALLBACK_MEDIA || isPlaceholderHost(url)) return false;
                    const key = url.toLowerCase();
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });
        }

        function filterBrokenImages(list) {
            if (!Array.isArray(list) || !list.length) return Promise.resolve([]);
            const snapshot = list.slice();
            return new Promise((resolve) => {
                let remaining = snapshot.length;
                const keep = new Array(snapshot.length).fill(false);
                const done = new Array(snapshot.length).fill(false);
                const timeoutMs = 2500;
                const finish = (idx, ok) => {
                    if (done[idx]) return;
                    done[idx] = true;
                    keep[idx] = ok;
                    remaining -= 1;
                    if (remaining <= 0) {
                        resolve(snapshot.filter((_, i) => keep[i]));
                    }
                };
                snapshot.forEach((src, idx) => {
                    const img = new Image();
                    const timer = window.setTimeout(() => finish(idx, false), timeoutMs);
                    img.onload = () => {
                        window.clearTimeout(timer);
                        finish(idx, true);
                    };
                    img.onerror = () => {
                        window.clearTimeout(timer);
                        finish(idx, false);
                    };
                    img.src = src;
                });
            });
        }

        // Normaliza lista de vídeos (strings ou objetos) preservando YouTube/MP4/links
        function normalizeVideoList(list) {
            const defaultCreators = [
                { name: 'Carla Maria', avatar: '/uploads/carla.jpg' },
                { name: 'Nandy zorzan', avatar: '/uploads/Nandy zorzan.jpg' },
                { name: 'Califórnices', avatar: '/uploads/Califórnices.jpg' },
                { name: 'Jose Marcos', avatar: '/uploads/jose.jpg' },
                { name: 'Andre Arthur', avatar: '/uploads/andre.jpg' },
                { name: 'Joyce Lima', avatar: '/uploads/joyce.jpg' },
                { name: 'Matheus Alberto', avatar: '/uploads/mateus.jpg' },
                { name: 'Juan Andrade', avatar: '/uploads/juan.jpg' },
                { name: 'Julia e Rafael', avatar: '/uploads/juliaerafael.jpg' },





            ];
            if (!list) return [];
            let arr = list;
            if (typeof list === 'string') {
                try { arr = JSON.parse(list); } catch (e) { arr = [list]; }
            }
            if (!Array.isArray(arr)) arr = [arr];
            return arr
                .map((item) => {
                    if (typeof item === 'string') {
                        return { url: item };
                    }
                    if (item && typeof item === 'object') {
                        const url = item.url || item.link || item.src || '';
                        return {
                            url,
                            titulo: item.titulo || item.title || '',
                            autor: item.autor || item.creator || item.user || '',
                            avatar: item.avatar || item.foto || item.photo || '',
                        };
                    }
                    return null;
                })
                .filter(Boolean)
                .map((item) => ({
                    ...item,
                    url: /youtu\.be|youtube\.com/.test(item.url || '') ? (item.url || '') : resolveMediaPath(item.url || ''),
                    avatar: item.avatar ? resolveMediaPath(item.avatar) : '',
                }))
                .filter(v => v.url)
                .slice(0, 9)
                .map((item, idx) => {
                    const profile = defaultCreators[idx % defaultCreators.length];
                    return {
                        ...item,
                        autor: item.autor || profile.name,
                        avatar: item.avatar || resolveMediaPath(profile.avatar),
                    };
                });
        }

        // Converte links do YouTube para embed e monta cards na grade
        function renderCreatorVideos(videos) {
            const container = document.getElementById('creator-videos-list');
            if (!container) return;

            const normalized = normalizeVideoList(videos);
            container.innerHTML = '';

            if (!normalized.length) {
                container.innerHTML = '<div class="creator-videos__empty">' + t('no_creator_videos') + '</div>';
                return;
            }

            const toYouTubeEmbed = (url) => {
                if (!url) return '';
                const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
                return match ? `https://www.youtube.com/embed/${match[1]}` : url;
            };

            const openModal = (video) => {
                const modal = document.getElementById('creator-video-modal');
                const media = document.getElementById('creator-video-modal-media');
                const avatar = document.getElementById('creator-video-modal-avatar');
                const nameEl = document.getElementById('creator-video-modal-name');
                const metaEl = document.getElementById('creator-video-modal-meta');
                const likesEl = document.getElementById('creator-video-modal-likes');
                if (!modal || !media || !avatar || !nameEl || !metaEl || !likesEl) return;

                media.innerHTML = '';
                const isYouTube = /youtu\.be|youtube\.com/.test(video.url || '');
                if (isYouTube) {
                    const iframe = document.createElement('iframe');
                    iframe.src = toYouTubeEmbed(video.url) + '?autoplay=1&rel=0';
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                    iframe.setAttribute('allowfullscreen', 'true');
                    media.appendChild(iframe);
                } else {
                    const vidEl = document.createElement('video');
                    vidEl.src = video.url;
                    vidEl.controls = true;
                    vidEl.playsInline = true;
                    vidEl.setAttribute('playsinline', 'true');
                    vidEl.setAttribute('webkit-playsinline', 'true');
                    vidEl.autoplay = true;
                    vidEl.preload = 'metadata';
                    media.appendChild(vidEl);
                }

                const cart = document.createElement('a');
                cart.className = 'creator-video-modal__cart';
                cart.href = 'index.html';
                cart.setAttribute('aria-label', 'Comprar');
                const cartIconWrap = document.createElement('span');
                cartIconWrap.className = 'creator-video-modal__cart-icon';
                const cartImg = document.createElement('img');
                cartImg.src = '/uploads/carrinho-de-compras.png';
                cartImg.alt = 'Carrinho';
                cartIconWrap.appendChild(cartImg);
                cart.appendChild(cartIconWrap);
                const cartLabel = document.createElement('span');
                cartLabel.textContent = (window.produtoAtual && window.produtoAtual.titulo) ? String(window.produtoAtual.titulo) : t('buy_now');
                cart.appendChild(cartLabel);
                media.appendChild(cart);

                if (video.avatar) {
                    avatar.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = video.avatar;
                    img.alt = video.autor || t('creator');
                    avatar.appendChild(img);
                } else {
                    avatar.textContent = initialsFrom(video.autor || t('creator'));
                }
                nameEl.textContent = video.autor || t('creator');
                metaEl.textContent = video.titulo || t('creator_video');

                const fakeLikes = Math.floor(800 + Math.random() * 1200);
                likesEl.textContent = t('likes_count', {n: fakeLikes.toLocaleString()});

                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
            };

            const closeModal = () => {
                const modal = document.getElementById('creator-video-modal');
                const media = document.getElementById('creator-video-modal-media');
                if (modal) {
                    modal.classList.remove('is-open');
                    modal.setAttribute('aria-hidden', 'true');
                }
                if (media) media.innerHTML = '';
            };

            (function attachModalClose(){
                const modal = document.getElementById('creator-video-modal');
                const btn = document.querySelector('.creator-video-modal__close');
                if (btn) btn.onclick = closeModal;
                if (modal) {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) closeModal();
                    });
                }
                document.addEventListener('keyup', (e) => {
                    if (e.key === 'Escape') closeModal();
                });
            })();

            const initialsFrom = (name) => {
                if (!name) return 'C';
                const parts = name.split(/\s+/).filter(Boolean);
                if (!parts.length) return 'C';
                const first = parts[0][0] || '';
                const last = parts.length > 1 ? parts[parts.length - 1][0] || '' : '';
                return (first + last).toUpperCase();
            };

            normalized.forEach((video) => {
                const card = document.createElement('div');
                card.className = 'creator-video-card';

                const embedWrapper = document.createElement('div');
                embedWrapper.className = 'embed-wrapper';

                const isYouTube = /youtu\.be|youtube\.com/.test(video.url || '');
                if (isYouTube) {
                    const iframe = document.createElement('iframe');
                    iframe.src = toYouTubeEmbed(video.url);
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                    iframe.setAttribute('allowfullscreen', 'true');
                    embedWrapper.appendChild(iframe);
                } else {
                    const vidEl = document.createElement('video');
                    vidEl.src = video.url;
                    vidEl.controls = false;
                    vidEl.playsInline = true;
                    vidEl.setAttribute('playsinline', 'true');
                    vidEl.setAttribute('webkit-playsinline', 'true');
                    vidEl.muted = true;
                    vidEl.autoplay = true;
                    vidEl.loop = true;
                    vidEl.preload = 'metadata';
                    embedWrapper.appendChild(vidEl);
                }

                embedWrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal(video);
                });

                const metaRow = document.createElement('div');
                metaRow.className = 'creator-video-card__meta-row';

                const avatar = document.createElement('div');
                avatar.className = 'creator-video-card__avatar';
                if (video.avatar) {
                    const img = document.createElement('img');
                    img.src = video.avatar;
                    img.alt = video.autor || t('creator');
                    avatar.appendChild(img);
                } else {
                    avatar.textContent = initialsFrom(video.autor || t('creator'));
                }

                const name = document.createElement('div');
                name.className = 'creator-video-card__name';
                name.textContent = video.autor || t('creator');

                metaRow.appendChild(avatar);
                metaRow.appendChild(name);

                embedWrapper.appendChild(metaRow);
                card.appendChild(embedWrapper);
                container.appendChild(card);
            });
        }
    </script>
    <script>
    (function () {
      var paramId = new URLSearchParams(location.search).get('produto_id');
      if (!paramId) return;
      document.documentElement.classList.add('produto-carregando');
      var FALLBACK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      function resolveBootMedia(path) {
        if (!path) return '';
        if (/^https?:/i.test(path) || /^data:/i.test(path)) return path;
        var raw = String(path).trim().replace(/^\.\/+/, '');
        return raw.charAt(0) === '/' ? raw : '/' + raw;
      }
      window.__produtoBootPromise = fetch('produtos.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (list) {
          if (!Array.isArray(list)) return null;
          var p = list.find(function (x) { return String(x.id) === String(paramId); });
          window.__produtoBoot = p || null;
          return p;
        });
      window.__applyProdutoBootImage = function () {
        var p = window.__produtoBoot;
        var mainImg = document.getElementById('main-product-image');
        if (!p || !mainImg) return;
        var foto = resolveBootMedia((p.fotos && p.fotos[0]) || p.imagem || '');
        if (!foto) {
          document.documentElement.classList.remove('produto-carregando');
          return;
        }
        var preload = new Image();
        preload.onload = function () {
          mainImg.src = foto;
          mainImg.style.opacity = '1';
          var loadingEl = document.getElementById('image-loading');
          if (loadingEl) loadingEl.style.display = 'none';
          document.documentElement.classList.remove('produto-carregando');
        };
        preload.onerror = function () {
          mainImg.src = FALLBACK;
          document.documentElement.classList.remove('produto-carregando');
        };
        preload.src = foto;
      };
      document.addEventListener('DOMContentLoaded', function () {
        if (window.__produtoBoot) window.__applyProdutoBootImage();
        else if (window.__produtoBootPromise) {
          window.__produtoBootPromise.then(function () { window.__applyProdutoBootImage(); });
        }
      });
    })();
    </script>
    <style>
    html.produto-carregando #product-title,
    html.produto-carregando #rating-text,
    html.produto-carregando #price-current,
    html.produto-carregando #price-compare,
    html.produto-carregando #discount-percent { visibility: hidden; }
    html.produto-carregando #main-product-image { opacity: 0 !important; }
    html.produto-carregando #image-loading {
      display: flex !important;
      align-items: center;
      justify-content: center;
      position: absolute;
      inset: 0;
      background: #fff;
      color: #9ca3af;
      font-size: 13px;
      z-index: 1;
    }
    </style>
</head>

<body style="overflow-x:hidden;overscroll-behavior-y:contain;touch-action:pan-y;">
<script>
/* pinch-zoom desativado via CSS, sem bloquear scroll no Android */
</script>
    <style>
        /* Transição suave no carrossel principal de fotos */
        .image-container {
            position: relative;
            overflow: hidden;
            background: #fff;
            aspect-ratio: 1 / 1;
            touch-action: pan-y;
        }
        .product-main-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            background: #fff;
            transition: opacity .35s ease;
            opacity: 0; /* começa transparente para dar fade-in no primeiro load */
            will-change: opacity;
        }
    .coupon-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
    }
    .coupon-card::before,
    .coupon-card::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 6px;
      height: 11px;
      background: #fff;
      border-radius: 999px;
      transform: translateY(-50%);
      z-index: 1;
    }
    .coupon-card::before { left: -3px; }
    .coupon-card::after { right: -3px; }
    </style>
    <div class="container">
        <!-- Header -->
        <header id="main-header" class="header">
            <div class="header-left"></div>
            <a href="index.html" onclick="return voltarLoja(event);" aria-label="Voltar para a página inicial"
                style="display: inline-flex; align-items: center; cursor: pointer; position: relative; z-index: 10;">
                <img src="/uploads/simbolo-da-linha-de-seta-para-a-esquerda.png" alt="Voltar" width="20" height="20"
                    style="display:block; pointer-events: none;">
            </a>
            <div class="flex-1" style="padding:0 8px;min-width:0;overflow:hidden;">
                <div style="display:flex;align-items:center;gap:6px;background:#f0f0f0;border-radius:8px;padding:8px 10px;overflow:hidden;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span id="header-search-text" style="font-size:13px;color:#555;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;"></span>
                </div>
            </div>



            <div class="header-right" style="font-size: 21px; margin-left: 21px;">
                <button onclick="handleOpenShareSection()">
                    <img src="/uploads/compartilhar.png" alt="Compartilhar" width="23" height="23">
                </button>
                <a href="cart.html"
                    style="position: relative; text-decoration: none; color: inherit; display: inline-flex; align-items: center;">
                    <img src="/uploads/carrinho-de-compras.png" alt="Compartilhar" width="23" height="23">

                    <span id="cart-count-header" style="
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff2d55;
            color: white;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        ">0</span>
                </a>
                <button onclick="handleOpenComplaintSection()"
                    style="display: inline-flex; align-items: center; padding: 0;">
                    <img src="/uploads/linha.png" alt="Denunciar" width="23" height="23" style="display:block;">
                </button>
            </div>
        </header>

        <!-- Product Images -->
        <section id="visao-geral-section" class="product-images" style="margin-top:8px;">
            <div class="image-container">
                                <img alt="Imagem do Produto" class="product-main-image" id="main-product-image"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                    style="display:block;"
                    onerror="this.onerror=null;this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';">
                <div class="image-loading" id="image-loading">Carregando...</div>
                <div class="image-counter" id="image-counter">1/1</div>
                <button class="swipe-indicator left" id="img-prev-btn"
                    style="background:none;border:none;font-size:22px;position:absolute;left:8px;top:50%;transform:translateY(-50%);z-index:2;">←</button>
                <button class="swipe-indicator right" id="img-next-btn"
                    style="background:none;border:none;font-size:22px;position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:2;">→</button>
            </div>
            <div class="image-dots" id="image-dots"></div>
            <div class="image-thumbnails" id="image-thumbnails"></div>
        </section>
        <!-- Faixa de preço: imagem full width + preços absolute por cima -->
        <div id="faixa-preco-wrap" style="position:relative;width:calc(100% + 12px);overflow:hidden;display:block;margin:0 -6px;border-radius:10px;">
            <img id="faixa-preco" src="/uploads/faixaoficialjasemfundoetamnahocerto.png?v=4" style="width:100%;height:auto;display:block;" alt="">
            <!-- Preços absolutos na área esquerda da faixa -->
            <div style="position:absolute;top:46%;left:4%;transform:translateY(-50%);display:flex;flex-direction:column;gap:2px;line-height:1.2;">
                <div style="display:flex;align-items:center;gap:20px;flex-wrap:nowrap;">
                    <span id="discount-percent" style="background:transparent;color:#1a0800;font-size:3.5vw;font-weight:800;white-space:nowrap;flex-shrink:0;line-height:1;"></span>
                    <span id="price-current" style="font-family:'TikTokDisplayFont',sans-serif;font-size:4.5vw;font-weight:700;color:#1a0e06;white-space:nowrap;"></span>
                    <img src="/uploads/bilhetefundotapreto.png?v=1" alt="" style="width:11vw;height:11vw;object-fit:contain;flex-shrink:0;margin-left:-24px;margin-top:2px;filter:brightness(0) invert(1) sepia(1) saturate(1.5) hue-rotate(-10deg) brightness(0.98);">
                </div>
                <span id="price-compare" style="text-decoration:line-through;color:#aaa;font-size:3.2vw;margin-top:-3px;"></span>
            </div>
        </div>

        <!-- Faixa Oferta Relâmpago: bloco separado com cores próprias -->
        <div id="faixa-relampago-wrap" style="position:relative;width:calc(100% + 12px);overflow:hidden;display:none;margin:0 -6px;border-radius:0;background:#f0500f;">
            <img id="faixa-relampago" src="/uploads/faixarelamapgaotamnocertotudo.png?v=9" style="width:100%;height:15vw;object-fit:cover;object-position:center;display:block;" alt=""><div style="position:absolute;inset:0;background:rgba(255,255,255,0.18);pointer-events:none;"></div>
            <div style="position:absolute;top:0;bottom:0;left:5%;display:flex;flex-direction:column;justify-content:center;padding-bottom:8px;gap:2px;line-height:1.2;">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:nowrap;">
                    <span id="discount-percent-r" style="background:transparent;color:#f0500f;font-size:3.5vw;font-weight:800;white-space:nowrap;flex-shrink:0;line-height:1;"></span>
                    <span id="price-current-r" style="font-family:'TikTokDisplayFont',sans-serif;font-size:4.5vw;font-weight:700;color:#ffffff;white-space:nowrap;transform:translateY(-0.5px);"></span>
                    <img src="/uploads/bilhetefundotapreto.png?v=1" alt="" style="width:11vw;height:11vw;object-fit:contain;flex-shrink:0;margin-left:-12px;margin-top:4px;filter:brightness(0) invert(1);">
                </div>
                <span id="price-compare-r" style="text-decoration:line-through;color:#aaa;font-size:3.2vw;margin-top:-7px;margin-left:-3px;"></span>
            </div>
        </div>

        <!-- Barra de cupons -->
        <div id="cupons-strip" style="width:calc(100% + 12px);margin:0 -6px 0 -6px;background:transparent;overflow-x:auto;overflow-y:hidden;padding:6px 12px;display:flex;gap:8px;align-items:center;scrollbar-width:none;-ms-overflow-style:none;">
            <div style="display:flex;align-items:center;gap:6px;background:#fde8ef;border:none;border-radius:3px;padding:2px 8px;flex-shrink:0;">
                <img src="/uploads/bilhete.png?v=2" alt="" style="width:2.8vw;height:2.8vw;object-fit:contain;flex-shrink:0;">
                <span id="cupom-1-texto" style="font-size:3vw;color:#c0184a;white-space:nowrap;font-weight:500;">Desconto de 25%, máximo de R$ 15</span>
            </div>
            <div style="display:flex;align-items:center;gap:4px;background:#fde8ef;border:none;border-radius:3px;padding:2px 8px;flex-shrink:0;">
                <span id="cupom-2-texto" style="font-size:3vw;color:#c0184a;white-space:nowrap;font-weight:500;">Economize 8% com bônus ›</span>
            </div>
        </div>
        <section class="product-info" style="padding: 6px 16px 2px 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
                <h1 id="product-title" class="product-title"
                    style="flex: 1; font-size: 16px; margin: 0; line-height: 1.3;"></h1>
                <button id="save-button"
                    style="background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease;"
                    onclick="toggleSave()">
                    <span class="save-btn-wrap" id="save-btn-wrap" style="pointer-events:auto;">
                        <img id="save-icon" src="/uploads/salvar.png" alt="Salvar" width="24" height="24"
                            style="display:inline-block; vertical-align:middle; pointer-events:none;" />
                    </span>
                </button>
            </div>
            <div class="rating-section" style="margin-top: 2px;">
                <span class="stars">
                    <svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107" style="width: 18px; height: 18px;">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                        </path>
                    </svg>
                </span>
                <span id="rating-text" class="rating-text" style="font-size: 12px; color: #888;"></span>
            </div>
        </section>
        <!-- Shipping Info -->
        <section class="shipping-info" style="padding: 8px 0;">
            <div class="shipping-row" style="padding: 8px 16px;">
                <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0; width: 100%;">
                    <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
                        <img class="shipping-icon" src="/uploads/entrega.png" alt="Entrega" width="16" height="16"
                            style="display:inline-block; transform: scale(0.95); margin-right:2px; vertical-align:middle;">
                        <span
                            style="background: #e0f7fa; color: #00bfae; font-size: 11px; font-weight: 600; border-radius: 5px; padding: 0px 6px; display: inline-block; vertical-align:middle;">Frete grátis</span>
                        <span id="shipping-date"
                            style="color: #000; font-size: 12px; margin-bottom: 0; margin-left: 4px; vertical-align:middle;">Receba
                            até 10–15 de set</span>
                    </div>
                    <div class="shipping-fee"
                        style="color: #999; font-size: 11px; text-decoration: line-through; margin-left: 22px; margin-top: 1px;">
                        Taxa de envio: R$ 20,90</div>
                </div>
                <span style="color: #000;"></span>
            </div>

            <div style="height: 1px; background-color: #f0f0f0; margin: 4px 0; width: 100%;"></div>

            <div class="shipping-row" style="padding: 8px 16px;">
                <img class="shipping-icon" src="/uploads/escudo.png" alt="Garantia" width="16" height="16"
                    style="display:block; transform: scale(0.85);">
                <div class="shipping-details">
                    <div style="color: #000; font-size: 12px; line-height: 1.2;">Devoluções gratuitas em 30 dias • Cancelamento fácil</div>
                </div>
                <span style="color: #000;"></span>
            </div>

            <!-- Bloco de opções de variações estilo TikTok -->
            <div id="variacoes-preview-row"
                style="display: flex; align-items: center; gap: 12px; padding: 12px 16px 8px 16px; cursor:pointer;"
                onclick="abrirModalVitrineVaria()">
                <img src="/uploads/grid.png" alt="Opções" width="15" height="15"
                    style="margin-right: 8px; opacity:0.7;">
                <div id="variacoes-thumbs" style="display: flex; gap: 6px;"></div>
                <span id="variacoes-qtd"
                    style="color: #888; font-size: 17px; margin-left: 12px; font-weight: 400;"></span>
                <svg style="margin-left: auto; opacity:0.6;" width="22" height="22" fill="none" stroke="#888"
                    stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                </svg>
            </div>
            <script>
                // Renderiza miniaturas das variações (ex: cores)
                function renderVariacoesPreview(produto) {
                    const thumbs = document.getElementById('variacoes-thumbs');
                    const qtd = document.getElementById('variacoes-qtd');
                    if (!produto || !produto.variacoes || produto.variacoes.length === 0) {
                        document.getElementById('variacoes-preview-row').style.display = 'none';
                        return;
                    }
                    document.getElementById('variacoes-preview-row').style.display = 'flex';
                    thumbs.innerHTML = '';
                    // Mostra até 4 miniaturas
                    produto.variacoes.slice(0, 4).forEach(v => {
                        if (v.imagem) {
                            const img = document.createElement('img');
                            img.src = v.imagem;
                            img.alt = v.titulo || '';
                            img.style.width = '38px';
                            img.style.height = '38px';
                            img.style.objectFit = 'cover';
                            img.style.borderRadius = '8px';
                            img.style.background = '#fafafa';
                            thumbs.appendChild(img);
                        }
                    });
                    qtd.textContent = t('n_options_available', {n: produto.variacoes.length});
                }
                // Função para abrir o mesmo modal de variações
                function abrirModalVitrineVaria() {
                    if (typeof abrirModalProduto === 'function' && window.produtoAtual) {
                        abrirModalProduto(window.produtoAtual);
                    } else if (typeof abrirModal === 'function') {
                        abrirModal();
                    }
                }
                // Chamar ao carregar produto
                document.addEventListener('DOMContentLoaded', function () {
                    // produtoAtual é usado no sistema, se não, tente window.produto
                    setTimeout(function () {
                        var prod = window.produtoAtual || window.produto;
                        if (prod) renderVariacoesPreview(prod);
                    }, 400);
                });
            </script>

            <div style="height: 1px; background-color: #f0f0f0; margin: 4px 0; width: 100%;"></div>
        </section>

        <section class="protecao-cliente">
            <div class="protecao-header">
                <div class="header-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a5c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>Proteção do cliente</span>
                </div>
                <div class="header-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="#7a5c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
                </div>
            </div>
            <ul class="protecao-lista">
                <li><span class="check">✓</span>Devolução gratuita</li>
                <li><span class="check">✓</span>Reembolso se algo der errado</li>
                <li><span class="check">✓</span>Pagamento 100% seguro</li>
                <li><span class="check">✓</span>Se o seu pedido não for enviado no prazo</li>
            </ul>
        </section>
        <!-- Bloco Ofertas -->
        <div style="background:#fff;padding:10px 14px 12px;margin:8px 0 0 0;box-shadow:0 1px 3px #0001;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <span style="font-size:15px;font-weight:700;color:#111;">Ofertas</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
            </div>
            <div style="overflow-x:auto;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch;">
                <div style="display:inline-flex;gap:8px;">
                    <!-- Cupom 1: envio -->
                    <div class="coupon-card" style="min-width:210px;background:#f0fbfd;border:1px solid #b2e8f0;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0;">
                        <div style="flex:1;min-width:0;">
                            <div style="font-size:12.5px;font-weight:700;color:#111;white-space:normal;line-height:1.3;">Cupom de envio</div>
                            <div style="font-size:11px;color:#6b7280;margin-top:3px;white-space:normal;line-height:1.4;max-width:175px;">Desconto de R$ 5 no frete em pedidos acima de R$ 109</div>
                        </div>
                        <button onclick="resgatarCupom('ENVIO7',this)" data-code="ENVIO7" style="background:transparent;color:#00bcd4;border:1.5px solid #00bcd4;border-radius:6px;padding:5px 10px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;">Usar</button>
                    </div>
                    <!-- Cupom 2: desconto -->
                    <div class="coupon-card" style="min-width:210px;background:#fff5f7;border:1px solid #fce7eb;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0;">
                        <div style="flex:1;min-width:0;">
                            <div style="font-size:12.5px;font-weight:700;color:#111;white-space:normal;line-height:1.3;">25% OFF</div>
                            <div style="font-size:11px;color:#6b7280;margin-top:3px;white-space:normal;line-height:1.4;">nos pedidos acima de R$ 80</div>
                        </div>
                        <button onclick="resgatarCupom('DESC5',this)" data-code="DESC5" style="background:transparent;color:#fe2d55;border:1.5px solid #fe2d55;border-radius:6px;padding:5px 10px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;">Usar</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="tabs-sentinel" style="height:1px;pointer-events:none;"></div>
        <div id="sticky-tabs" class="tabs">
            <div class="tab active" onclick="scrollToVisaoGeral()">Visão geral</div>
            <div class="tab" onclick="scrollToVideosCriadores()">Vídeos dos criadores</div>
            <div class="tab" onclick="scrollToAvaliacoes()">Opiniões</div>
            <div class="tab" onclick="scrollToDescription()">Descrição</div>
            <div class="tab" onclick="scrollToRecomendacoes()">Recomendações</div>
        </div>
        <!-- Vídeos dos criadores -->

        <section id="creator-videos" class="creator-videos">
            <div class="creator-videos__header">
                <div class="creator-videos__title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 10.5V6.75C15 5.784 14.216 5 13.25 5H4.75C3.784 5 3 5.784 3 6.75V17.25C3 18.216 3.784 19 4.75 19H13.25C14.216 19 15 18.216 15 17.25V13.5L20 18V6L15 10.5Z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/>
                    </svg>
                    <span>Vídeos dos criadores</span>
                </div>
                <span class="creator-videos__subtitle">Conteúdo enviado por quem testou</span>
            </div>
            <div class="creator-videos__grid" id="creator-videos-list">
                <div class="creator-videos__empty">Nenhum vídeo de criador disponível no momento.</div>
            </div>
        </section>

        <div id="creator-video-modal" class="creator-video-modal" aria-hidden="true">
            <div class="creator-video-modal__content">
                <button class="creator-video-modal__close" type="button" aria-label="Fechar">×</button>
                <div class="creator-video-modal__media" id="creator-video-modal-media">
                    <a class="creator-video-modal__cart" href="index.html" aria-label="Comprar">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h-2l-1 2v2h2l2-2h6l2 2h2v-2l-1-2h-2l-1-2h-4l-1 2zM5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5zm4 3h2v6H9v-6zm4 0h2v6h-2v-6z"></path></svg>
                    </a>
                </div>
                <div class="creator-video-modal__profile">
                    <div class="creator-video-modal__profile-left">
                        <div class="creator-video-modal__profile-avatar" id="creator-video-modal-avatar">C</div>
                        <div>
                            <div class="creator-video-modal__profile-name" id="creator-video-modal-name">Criador</div>
                            <div class="creator-video-modal__meta" id="creator-video-modal-meta"></div>
                        </div>
                    </div>
                    <div class="creator-video-modal__meta" id="creator-video-modal-likes"></div>
                </div>
            </div>
        </div>


        <!-- Tab Content -->
        <div class="content-section active" id="overview">
            <!-- Options -->

            <!-- Reviews Section -->
            <section id="avaliacoes-section" class="reviews-section" style="padding-top: 10px; padding-bottom: 0;">
                <div class="reviews-header" style="margin-bottom: 2px;">
                    <span class="reviews-title" id="reviews-count">Avaliações dos clientes (207)</span>
                </div>
                <div class="reviews-rating">
                    <span class="rating-big" style="font-size: 18px;">4.7</span>
                    <span style="font-size: 14px; color: #999;">/5</span>
                    <span class="stars">
                        <svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107">
                            <path
                                d="M12 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107">
                            <path
                                d="M12 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107">
                            <path
                                d="M12 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107">
                            <path
                                d="M12 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107">
                            <path
                                d="M12 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </span>
                </div>
                <!-- Novos depoimentos mais recentes aparecem primeiro -->
                <div id="dynamic-reviews"></div>

                <!-- Bottom Navigation -->
                <nav class="bottom-nav">
                    <a class="nav-item" href="index.html">
                        <img class="nav-icon" src="/uploads/iconeloja_black.png" alt="Loja" width="46" height="46">
                        <span>Loja</span>
                    </a>
                    <a class="nav-item" href="#">
                        <img class="nav-icon" src="/uploads/iconechat_black.png" alt="Chat" width="46" height="46">
                        <span>Chat</span>
                    </a>
                    <button class="add-cart-btn" id="add-to-cart-btn" type="button" autocomplete="off" form="" tabindex="0" style="flex:1;height:38px;border-radius:50px;background:#f0f0f0;color:#333;border:none;font-size:13px;font-weight:600;line-height:1.3;cursor:pointer;text-align:center;display:flex;align-items:center;justify-content:center;padding:0 10px;font-family:inherit;">Adicionar ao carrinho</button>
                    <a class="buy-btn" href="javascript:void(0);" role="button" id="buy-now-btn" style="flex:1;height:38px;border-radius:50px;background:linear-gradient(160deg,#ff2d5b,#e8103a);color:#fff;border:none;font-size:15px;font-weight:700;cursor:pointer;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 10px;font-family:inherit;text-decoration:none;">
                        <span style="font-size:14px;font-weight:700;color:#fff;display:block;">Comprar agora</span>
                        <span style="font-size:10px;font-weight:400;color:rgba(255,255,255,0.85);display:block;margin-top:1px;">Sem juros</span>
                    </a>
                </nav>

                <!-- Modal de seleção (novo padrão clonado do index.html) -->
                <div id="meuModal" class="fixed inset-0 bg-black bg-opacity-50 items-end justify-center" style="z-index:9500;display:none;" onclick="if(event.target===this)fecharModal()">
                <div class="bg-white p-4 w-full max-w-lg relative" style="position:fixed; bottom:0; left:0; right:0; overflow-y: auto; -webkit-overflow-scrolling: touch; max-height: 85vh; box-shadow: none; border-radius:0; margin:0 auto; max-width:480px; padding-bottom: calc(16px + env(safe-area-inset-bottom));">
                <button onclick="fecharModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold" aria-label="Fechar">×</button>
                <div id="modal-loader" class="w-full flex items-center justify-center py-14">
                <div class="dots-line" aria-label="Carregando">
                <span class="dot dot-red"></span>
                <span class="dot dot-cyan"></span>
                </div>
                </div>
                <div id="modal-conteudo" class="hidden" style="padding-bottom:0;">
                <!-- Topo: imagem + preço -->
                <div style="display:flex;gap:12px;padding:4px 0 10px;">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="Produto" id="img-solts" style="width:80px;height:80px;min-width:80px;object-fit:contain;border-radius:8px;background:#f5f5f5;display:block;" loading="lazy">
                <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <span id="div_ors_badge" style="background:#fe2d55;color:#fff;font-weight:700;padding:2px 7px;border-radius:6px;font-size:13px;flex-shrink:0;"></span>
                <span style="color:#fe2d55;font-size:13px;white-space:nowrap;">A partir de R$</span>
                <span id="div_ors_3" style="color:#fe2d55;font-size:22px;font-weight:800;line-height:1;"></span>
                </div>
                <div style="margin-bottom:6px;">
                <span id="div_ors_2" style="color:#aaa;font-size:13px;text-decoration:line-through;"></span>
                </div>
                <div id="modal-bilhete-chip" style="display:inline-flex;align-items:center;gap:4px;background:#fff0f3;border-radius:4px;padding:3px 8px;">
                <img src="/uploads/bilhete.png?v=2" style="height:11px;width:auto;display:block;">
                <span id="modal-bilhete-text" style="color:#fe2d55;font-size:11px;font-weight:700;">Desconto exclusivo</span>
                </div>
                </div>
                </div>
                <!-- Banner Oferta Relâmpago (aparece se promo_ativa) -->
                <div id="modal-oferta-banner" style="display:none;margin-bottom:12px;">
                <span class="oferta-badge-wrap" style="display:inline-flex;align-items:center;border-radius:4px;overflow:hidden;flex-shrink:0;height:20px;background:#e8562a;">
                <img src="/uploads/oferta-relamapago.png?v=2" style="height:20px;width:auto;display:block;">
                <span class="oferta-timer" style="background:#fff0e8;color:#e8562a;font-size:11px;font-weight:800;padding:0 8px;height:100%;display:flex;align-items:center;">00:20:00</span>
                </span>
                </div>
                <!-- Variações -->
                <div id="chatsw-variacoes" style="margin-top:4px;">
                <div id="titulo-variacoes"></div>
                <div id="grid-variacoes"></div>
                </div>
                <!-- Quantidade + Botão -->
                <div id="buy-positions">
                <a href="javascript:void(0);" onclick="comprarAgora()" id="div_ors_4" class="w-full text-white font-semibold text-center block" style="font-size:16px;font-weight:700;border-radius:999px;padding:14px;background:#ff1744;outline:none;-webkit-tap-highlight-color:transparent;box-shadow:none;">Adicionar ao carrinho</a>
                </div>
                </div>
                </div>
                </div>
        </div>

        <section class="reviews-card" aria-label="Avaliações da loja">

            <div class="reviews-header">
                <div>
                    <div class="title">Avaliações da loja <span style="color:var(--muted);font-weight:600">(13,9
                            mil)</span></div>
                    <div class="subtitle">Resumo e classificação dos clientes</div>
                </div>

                <div class="chev" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <div class="pills" role="list">

                <div class="pill media-pill" role="listitem" tabindex="0" title="Inclui imagens ou vídeos (2,5 mil)">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                        <path d="M4 7h.01M20 7h.01M3 7a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"
                            stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="8.5" cy="11.5" r="2" stroke="currentColor" stroke-width="1.2" />
                    </svg>
                    <small>Inclui imagens ou vídeos</small>
                    <span style="color:var(--muted);font-weight:700">(2,5 mil)</span>
                </div>

                <div class="pill star-pill" role="listitem" tabindex="0" title="5 estrelas">
                    <span class="badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 .587l3.668 7.431L24 9.748l-6 5.857L19.335 24 12 20.201 4.665 24 6 15.605 0 9.748l8.332-1.73L12 .587z"
                                fill="var(--accent)" />
                        </svg>
                        5
                    </span>
                    <span class="count">(12,3 mil)</span>
                </div>

                <div class="pill star-pill" role="listitem" tabindex="0" title="4 estrelas">
                    <span class="badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 .587l3.668 7.431L24 9.748l-6 5.857L19.335 24 12 20.201 4.665 24 6 15.605 0 9.748l8.332-1.73L12 .587z"
                                fill="var(--accent)" />
                        </svg>
                        4
                    </span>
                    <span class="count">(857)</span>
                </div>

            </div>

        </section>

        <!-- Store Info Section -->
        <div style="margin:12px 14px;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,0.12);background:#1a0a04;">
                        <div style="background:linear-gradient(to right,#321408 0%,#180a04 55%,#080302 100%);display:flex;align-items:flex-start;justify-content:space-between;padding:9px 14px 32px;cursor:pointer;user-select:none;" onclick="abrirModalOficial()">
                <img src="/assets/img/tiktok-shop-oficial.png" alt="Oficial" style="height:22px;width:auto;display:block;opacity:0.82;filter:sepia(0.25) brightness(1.08);">
                <div style="display:flex;align-items:center;gap:0;">
                    <span style="color:#d4aa72;font-size:11px;letter-spacing:0.1px;">Devoluções gratuitas · Frete grátis</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
            </div>
                        <div style="background:#fff;padding:14px 16px 0;border-radius:22px 22px 0 0;margin-top:-32px;position:relative;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0;">
                        <div style="width:56px;height:56px;min-width:56px;border-radius:999px;background:#d1d5db;overflow:hidden;flex-shrink:0;">
                            <img id="store-logo" src="/uploads/asics-logo.jpg" data-default-logo="/uploads/asics-logo.jpg" alt="Logo ASICS" style="width:100%;height:100%;object-fit:contain;display:block;background:#fff;padding:6px;box-sizing:border-box;" loading="lazy">
                        </div>
                        <div style="min-width:0;flex:1;">
                            <p id="store-nome" style="font-size:16px;font-weight:700;color:#111;margin:0;line-height:1.2;">Shop</p>
                            <div style="display:flex;align-items:center;gap:0;margin-top:3px;"><img src="/uploads/taglojaestrela.png" style="height:15px;max-width:70px;width:auto;display:block;flex-shrink:0;margin-right:5px;"><p id="store-vendidos" style="font-size:12px;color:#666;margin:0;">- vendido(s)</p></div>
                        </div>
                    </div>
                    <a href="index.html" style="flex-shrink:0;background:#fe2d55;color:#fff;font-size:14px;font-weight:600;padding:8px 22px;border-radius:999px;text-decoration:none;white-space:nowrap;">Visitar</a>
                </div>
                <div style="display:flex;gap:20px;padding:12px 0 14px;border-top:1px solid #f5f5f5;margin-top:12px;">
                    <span style="font-size:12px;color:#555;"><b style="color:#111;">94%</b> responde em 24h</span>
                    <span style="font-size:12px;color:#555;"><b style="color:#111;">95%</b> envios pontuais</span>
                </div>
            </div>
        </div>

        <section class="max-w-6xl mx-auto px-4 py-6">
            <h2 class="text-lg font-semibold mb-4">Mais desta loja</h2>

            <div class="mais-desta-loja-carousel" id="mais-desta-loja-carousel">
                <!-- Produtos serão inseridos dinamicamente aqui via JS. Fallback abaixo: -->
                <noscript>
                <!-- Produto 1 -->
                <div class="mais-desta-loja-card">
                    <div class="img-wrap">
                        <img src="https://via.placeholder.com/150x150?text=Árvore" alt="Árvore de Natal">
                    </div>
                    <div class="valores">
                        <p class="preco">R$ 29,90</p>
                        <p class="desconto">-35%</p>
                    </div>
                </div>
                <!-- Produto 2 -->
                <div class="mais-desta-loja-card">
                    <div class="img-wrap">
                        <img src="https://via.placeholder.com/150x150?text=Luzes" alt="Pisca-pisca">
                    </div>
                    <div class="valores">
                        <p class="preco">R$ 44,01</p>
                        <p class="desconto">-37%</p>
                    </div>
                </div>
                <!-- Produto 3 -->
                <div class="mais-desta-loja-card">
                    <div class="img-wrap">
                        <img src="https://via.placeholder.com/150x150?text=Bolinhas" alt="Bolas de Natal">
                    </div>
                    <div class="valores">
                        <p class="preco">R$ 19,00</p>
                        <p class="desconto">-36%</p>
                    </div>
                </div>
                <!-- Produto 4 -->
                <div class="mais-desta-loja-card">
                    <div class="img-wrap">
                        <img src="https://via.placeholder.com/150x150?text=Papai+Noel" alt="Fantasia Papai Noel">
                    </div>
                    <div class="valores">
                        <p class="preco">R$ 38,61</p>
                        <p class="desconto">-35%</p>
                    </div>
                </div>
                </noscript>
            </div>
        </section>
        <script>
        // Função para popular dinamicamente a seção "Mais desta loja" com produtos da vitrine
        document.addEventListener('DOMContentLoaded', function () {
            fetch(withCacheBust('produtos.json'), { cache: 'no-store' })
                .then(resp => resp.ok ? resp.json() : [])
                .then(produtos => {
                    if (!Array.isArray(produtos) || produtos.length === 0) return;
                    // Tenta identificar o produto atual pelo parâmetro da URL
                    function getUrlParam(name) {
                        const url = new URL(window.location.href);
                        return url.searchParams.get(name);
                    }
                    // Formata desconto para inteiro sem casas decimais (ex: 40.00 -> 40)
                    function formatDesconto(val) {
                        if (val === undefined || val === null) return null;
                        let s = String(val).trim();
                        s = s.replace('%', '').replace(',', '.');
                        // remove sinais não-numéricos extras
                        s = s.replace(/[^0-9.\-]/g, '');
                        const n = parseFloat(s);
                        if (isNaN(n)) return null;
                        const r = Math.round(n); // arredonda para o inteiro mais próximo
                        return String(Math.abs(r));
                    }
                    let produtoAtual = produtos[0];
                    const paramId = getUrlParam('produto_id');
                    if (paramId !== null) {
                        const found = produtos.find(p => String(p.id) === String(paramId));
                        if (found) produtoAtual = found;
                    }
                    // Filtra produtos da mesma vitrine (exemplo: mesmo campo "vitrine_id" ou similar)
                    let vitrineId = produtoAtual.vitrine_id || produtoAtual.vitrine || null;
                    let produtosVitrine = vitrineId
                        ? produtos.filter(p => (p.vitrine_id || p.vitrine) == vitrineId && p.id != produtoAtual.id)
                        : produtos.filter(p => p.id != produtoAtual.id);
                    // Limita a 5 produtos
                    produtosVitrine = produtosVitrine.slice(0, 5);
                    const carousel = document.getElementById('mais-desta-loja-carousel');
                    if (!carousel) return;
                    carousel.innerHTML = '';
                    if (produtosVitrine.length === 0) {
                        carousel.innerHTML = '<div style="color:#888;font-size:14px;">' + t('no_products_found') + '</div>';
                        return;
                    }
                    produtosVitrine.forEach(prod => {
                        const card = document.createElement('div');
                        card.className = 'mais-desta-loja-card';
                        card.style.cursor = 'pointer';
                        card.onclick = function() {
                            window.location.href = 'produto.html?produto_id=' + encodeURIComponent(prod.id);
                        };
                        const descontoFmt = formatDesconto(prod.desconto);
                        const fotoCard = resolveMediaPath((Array.isArray(prod.fotos) && prod.fotos[0]) ? prod.fotos[0] : (prod.imagemPrincipal || prod.imagem || '')) || FALLBACK_MEDIA;
                        card.innerHTML = `
                            <div class="img-wrap">
                                <img src="${fotoCard}" alt="${prod.titulo || t('product')}" onerror="this.onerror=null;this.src='${FALLBACK_MEDIA}';">
                            </div>
                            <div class="valores">
                                <p class="preco">R$ ${prod.preco || '--'}</p>
                                ${descontoFmt !== null ? `<p class='desconto'>-${descontoFmt}%</p>` : ''}
                            </div>
                        `;
                        carousel.appendChild(card);
                    });
                });
        });
        </script>

        <script>
            // Preencher o comentário em destaque com o primeiro comentário do backend
            function preencherComentarioDestaque(produto) {
                const el = document.getElementById('comentario-destaque');
                if (!el) return;
                if (produto.comentarios && produto.comentarios.length) {
                    el.textContent = produto.comentarios[0].descricao || produto.comentarios[0].texto || t('no_comments');
                } else {
                    el.textContent = t('no_comments_available');
                }
            }
            // Renderizar avaliações dinâmicas do backend
            function renderDynamicReviews(produto) {
                const container = document.getElementById('dynamic-reviews');
                if (!container) return;
                container.innerHTML = '';
                if (!produto.comentarios || !produto.comentarios.length) {
                    container.innerHTML = '<div style="color:#888;font-size:14px;">' + t('no_reviews_yet') + '</div>';
                    return;
                }
                const allComentarios = produto.comentarios.slice().reverse();

                // --- Carrossel de vídeos dos reviews ---
                const todosVideos = [];
                allComentarios.forEach(function(com) {
                    let vids = com.videos;
                    if (typeof vids === 'string') { try { vids = JSON.parse(vids); } catch(e) { vids = []; } }
                    if (!Array.isArray(vids)) vids = [];
                    vids.filter(Boolean).forEach(function(v) {
                        todosVideos.push({ url: v, nome: com.nome || '', avatar: com.foto_perfil || 'images/perfil1.png' });
                    });
                });
                if (todosVideos.length > 0) {
                    const carWrap = document.createElement('div');
                    carWrap.style.cssText = 'margin-bottom:18px;';
                    const carTitle = document.createElement('p');
                    carTitle.style.cssText = 'font-size:13px;font-weight:700;color:#111;margin:0 0 10px;padding-left:2px;';
                    carTitle.textContent = 'Vídeos dos clientes (' + todosVideos.length + ')';
                    const carTrack = document.createElement('div');
                    carTrack.style.cssText = 'display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;scroll-snap-type:x mandatory;';
                    carTrack.style.scrollbarWidth = 'none';
                    todosVideos.forEach(function(item, idx) {
                        const card = document.createElement('div');
                        card.style.cssText = 'flex:0 0 110px;width:110px;height:160px;border-radius:12px;overflow:hidden;position:relative;cursor:pointer;background:#f0f0f0;scroll-snap-align:start;';
                        var vid = document.createElement('video');
                        vid.src = item.url;
                        vid.muted = true;
                        vid.setAttribute('playsinline', '');
                        vid.setAttribute('preload', 'metadata');
                        vid.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
                        vid.addEventListener('loadedmetadata', function() { this.currentTime = 0.5; });
                        card.appendChild(vid);
                        card.insertAdjacentHTML('beforeend',
                            '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 50%);pointer-events:none;"></div>'
                            + '<div style="position:absolute;bottom:7px;left:7px;right:7px;display:flex;align-items:center;gap:5px;pointer-events:none;">'
                            + '<img src="' + item.avatar + '" style="width:22px;height:22px;border-radius:50%;object-fit:cover;border:1.5px solid #fff;flex-shrink:0;" onerror="this.onerror=null;this.src=\'images/perfil1.png\'">'
                            + '<span style="color:#fff;font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.nome + '</span></div>'
                            + '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;pointer-events:none;">'
                            + '<svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>'
                        );
                        card.addEventListener('click', function() { _abrirVideoReview(item.url, item.nome, item.avatar, idx, todosVideos); });
                        carTrack.appendChild(card);
                    });
                    carWrap.appendChild(carTitle);
                    carWrap.appendChild(carTrack);
                    container.appendChild(carWrap);
                }

                // --- Lista de comentários ---
                allComentarios.forEach(comentario => {
                    let fotos = normalizeFotoList(comentario.fotos);
                    const avatarSrc = resolveMediaPath(comentario.foto_perfil || 'images/perfil1.png');
                    const div = document.createElement('div');
                    div.className = 'review-item';
                    div.innerHTML = `
            <div class="review-header">
                <div class="review-avatar">
                    <img alt="${comentario.nome || t('user')}" src="${avatarSrc}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.onerror=null;this.src='${FALLBACK_MEDIA}';">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <span class="review-name">${comentario.nome || t('user')}</span>
                    <span style="color: #00d4aa; font-size: 11px; font-weight: 500;">${comentario.created_at || ''}</span>
                </div>
            </div>
            <div class="review-stars">
                ${'<svg class="star-icon" viewBox="0 0 24 24" fill="#ffc107"><path d="M12 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'.repeat(Math.round(comentario.nota || 5))}
            </div>
            <div class="review-variant">${comentario.variacao ? t('item_label') + ' ' + comentario.variacao : ''}</div>
            <div class="review-text">${comentario.descricao || ''}</div>
            <div class="review-images">
                ${fotos.map((f, i) => `<div class="review-image"><img alt="Review photo ${i + 1}" src="${f}" onerror="this.onerror=null;this.src='${FALLBACK_MEDIA}';" onclick="openFullscreen('${f}', ${i})"></div>`).join('')}
            </div>
        `;
                    container.appendChild(div);
                });
            }
            // Utilitário para pegar parâmetro da URL
            function getUrlParam(name) {
                const url = new URL(window.location.href);
                return url.searchParams.get(name);
            }

            // Carregar logo da loja dinamicamente de loja.json
            fetch('loja.json')
                .then(resp => resp.ok ? resp.json() : null)
                .then(data => {
                    // Corrige: se logo for null, undefined ou vazio, usa o default
                    var logoUrl = '/uploads/asics-logo.jpg';
                    if (data && data.logo && typeof data.logo === 'string' && data.logo.trim() !== '') {
                        const logoPath = data.logo.startsWith('http') ? data.logo : data.logo.replace(/^\/\/+/, '');
                        logoUrl = logoPath.startsWith('http') ? logoPath : logoPath;
                    }
                    if (data && data.logo_updated_at) {
                        logoUrl += (logoUrl.indexOf('?') >= 0 ? '&' : '?') + 'v=' + encodeURIComponent(data.logo_updated_at);
                    }
                    var storeLogo = document.getElementById('store-logo');
                    if (storeLogo) {
                        storeLogo.onerror = function () {
                            storeLogo.onerror = null;
                            storeLogo.src = '/uploads/asics-logo.jpg';
                        };
                        storeLogo.src = logoUrl;
                    }
                    if (data && data.nome) {
                        // Atualiza o nome da loja dinamicamente
                        var nomeEl = document.getElementById('store-nome');
                        if (nomeEl) nomeEl.textContent = data.nome;
                    }
                    // Buscar vendidos do backend (produtos.json)
                    fetch(withCacheBust('produtos.json'), { cache: 'no-store' })
                        .then(resp => resp.ok ? resp.json() : Promise.reject('fetch_fail'))
                        .then(produtos => {
                            if (Array.isArray(produtos)) {
                                // Soma todos vendidos dos produtos
                                const vendidos = produtos.reduce((acc, p) => acc + (parseInt(p.quantidade_produtos || p.vendidos || 0, 10)), 0);
                                const vendidosEl = document.getElementById('store-vendidos');
                                if (vendidosEl) vendidosEl.textContent = t('sold_count', {n: vendidos});
                                // Buscar produto pelo ID da URL (prioriza boot antecipado)
                                const paramId = getUrlParam('produto_id');
                                let produto = window.__produtoBoot || null;
                                if (!produto && paramId !== null) {
                                    produto = produtos.find(p => String(p.id) === String(paramId)) || null;
                                }
                                if (!produto) produto = produtos[0];
                                // Normaliza caminhos de imagens para aceitar com ou sem barra inicial
                                const fotosBase = normalizeFotoList(produto.fotos || produto.imagens || (produto.imagem ? [produto.imagem] : []));
                                produto.fotos = fotosBase.length ? fotosBase : [];
                                if (!produto.fotos.length && produto.foto) {
                                    produto.fotos = normalizeFotoList([produto.foto]);
                                }
                                produto.imagemPrincipal = resolveMediaPath(produto.imagemPrincipal || produto.imagem || produto.foto || produto.fotos[0] || '');
                                if (Array.isArray(produto.variacoes)) {
                                    produto.variacoes = produto.variacoes.map(v => ({
                                        ...v,
                                        imagem: resolveMediaPath(v.imagem || v.foto || ''),
                                    }));
                                }
                                // Normaliza vídeos de criadores (opcional no produto)
                                const rawVideos = produto.videos || produto.videos_criadores || produto.videosCriadores || [];
                                produto.videos = normalizeVideoList(rawVideos);
                                renderCreatorVideos(produto.videos);
                                // Torna o produto selecionado global para o preview de variações
                                window.produtoAtual = normalizarProduto(produto);
                                atualizarFaixa(produto);
                                // Atualizar título da página com tag oficial inline
                                var _stEl = document.getElementById('header-search-text');
        if (_stEl && produto.titulo) _stEl.textContent = produto.titulo;
        var _ptEl = document.getElementById('product-title');
                                if (_ptEl && produto.titulo) {
                                    var _tagH = (window.EXIBIR_TAG_OFICIAL ? '<img src="/uploads/tagoficial.png" style="height:14px;width:auto;vertical-align:middle;margin-right:4px;display:inline;">' : '')
                                              + (window.EXIBIR_TAG_TORCER  ? '<img src="/uploads/tagtorcer.png"  style="height:14px;width:auto;vertical-align:middle;margin-right:4px;display:inline;">' : '');
                                    _ptEl.innerHTML = _tagH + produto.titulo;
                                }
                                // Número de avaliações dinâmico do produto selecionado
                                const reviewsCount = (typeof produto.avaliacoes === 'number') ? produto.avaliacoes : 207;
                                const reviewsCountEl = document.getElementById('reviews-count');
                                if (reviewsCountEl) reviewsCountEl.textContent = t('customer_reviews_count', {n: reviewsCount});

                                // Atualiza o número azul na avaliação do produto
                                const ratingText = document.getElementById('rating-text');
                                if (ratingText && produto) {
                                    const notas = produto.notas || '5';
                                    const reviewCount = Array.isArray(produto.comentarios) ? produto.comentarios.length : 0;
                                    const vendidos = produto.quantidade_produtos || 0;
                                    ratingText.innerHTML = notas + ' (<span style="color:#2196f3;font-weight:700;">' + reviewCount + '</span>) ' + vendidos + ' vendidos';
                                }

                                // Renderizar avaliações dinâmicas
                                renderDynamicReviews(produto);
                                // Preencher comentário destaque
                                preencherComentarioDestaque(produto);

                                // --- Lógica de carrossel de imagens ---
                                setTimeout(function () {
                                    const mainImg = document.getElementById('main-product-image');
                                    const loadingEl = document.getElementById('image-loading');
                                    const imageCounter = document.getElementById('image-counter');
                                    const imageDots = document.getElementById('image-dots');
                                    const imageThumbnails = document.getElementById('image-thumbnails');
                                    const btnPrev = document.getElementById('img-prev-btn');
                                    const btnNext = document.getElementById('img-next-btn');
                                    const imageContainer = document.querySelector('.image-container');
                                    let currentImgIdx = 0;
                                    let scanStarted = false;

                                    function scanImagesOnce() {
                                        if (scanStarted) return;
                                        scanStarted = true;
                                        if (!Array.isArray(produto.fotos) || produto.fotos.length < 2) return;
                                        const snapshot = produto.fotos.slice();
                                        filterBrokenImages(snapshot).then((valid) => {
                                            if (!Array.isArray(produto.fotos)) return;
                                            if (!Array.isArray(valid) || valid.length === 0) {
                                                if (produto.fotos.length) {
                                                    produto.fotos = [];
                                                    currentImgIdx = 0;
                                                    showImage(0);
                                                }
                                                return;
                                            }
                                            const validSet = new Set(valid.map((src) => String(src).toLowerCase()));
                                            const nextList = produto.fotos.filter((src) => validSet.has(String(src).toLowerCase()));
                                            if (!nextList.length) {
                                                produto.fotos = [];
                                                currentImgIdx = 0;
                                                showImage(0);
                                                return;
                                            }
                                            if (nextList.length !== produto.fotos.length) {
                                                const currentSrc = produto.fotos[currentImgIdx];
                                                produto.fotos = nextList;
                                                const nextIdx = currentSrc ? produto.fotos.indexOf(currentSrc) : -1;
                                                currentImgIdx = nextIdx >= 0 ? nextIdx : Math.min(currentImgIdx, produto.fotos.length - 1);
                                                showImage(currentImgIdx);
                                            }
                                        });
                                    }

                                    function showImage(idx) {
                                        if (!produto.fotos || produto.fotos.length === 0) {
                                            if (mainImg) {
                                                mainImg.src = FALLBACK_MEDIA;
                                                mainImg.style.display = 'none';
                                            }
                                            if (loadingEl) loadingEl.textContent = t('no_image');
                                            if (imageCounter) imageCounter.textContent = '0/0';
                                            if (imageDots) {
                                                imageDots.innerHTML = '';
                                            }
                                            if (imageThumbnails) {
                                                imageThumbnails.innerHTML = '';
                                            }
                                            return;
                                        }
                                        const targetIdx = ((idx % produto.fotos.length) + produto.fotos.length) % produto.fotos.length;
                                        if (mainImg) {
                                            const nextSrc = produto.fotos[targetIdx];
                                            mainImg.onerror = () => {
                                                mainImg.onerror = null;
                                                mainImg.src = FALLBACK_MEDIA;
                                            };
                                            const prevIdx = currentImgIdx;
                                            const direction = (targetIdx > prevIdx) ? 'forward' : (targetIdx < prevIdx ? 'backward' : 'none');
                                            const hasCurrent = !!mainImg.getAttribute('src');
                                            currentImgIdx = targetIdx;
                                            // Pré-carrega próxima imagem para evitar piscada
                                            const preload = new Image();
                                            if (loadingEl) loadingEl.style.display = '';
                                            preload.onload = function () {
                                                if (loadingEl) loadingEl.style.display = 'none';
                                                if (hasCurrent && direction !== 'none') {
                                                    // remover camada anterior se existir
                                                    const oldTemp = imageContainer.querySelector('.pmf-next-layer');
                                                    if (oldTemp) oldTemp.remove();
                                                    const temp = document.createElement('img');
                                                    temp.className = 'pmf-next-layer';
                                                    temp.alt = t('product_image');
                                                    temp.src = nextSrc; // já carregado
                                                    temp.style.position = 'absolute';
                                                    temp.style.inset = '0';
                                                    temp.style.width = '100%';
                                                    temp.style.height = '100%';
                                                    temp.style.objectFit = 'contain';
                                                    temp.style.objectPosition = 'center';
                                                    temp.style.background = '#fff';
                                                    temp.style.willChange = 'transform';
                                                    const dur = '.40s';
                                                    temp.style.transition = 'transform ' + dur + ' cubic-bezier(.25,.8,.25,1)';
                                                    // posição inicial fora
                                                    temp.style.transform = (direction === 'forward') ? 'translateX(100%)' : 'translateX(-100%)';
                                                    imageContainer.appendChild(temp);
                                                    // preparar imagem atual
                                                    mainImg.style.willChange = 'transform';
                                                    mainImg.style.transition = 'transform ' + dur + ' cubic-bezier(.25,.8,.25,1)';
                                                    mainImg.style.transform = 'translateX(0)';
                                                    // dispara animação
                                                    requestAnimationFrame(() => {
                                                        temp.style.transform = 'translateX(0)';
                                                        mainImg.style.transform = (direction === 'forward') ? 'translateX(-100%)' : 'translateX(100%)';
                                                    });
                                                    temp.addEventListener('transitionend', function (e) {
                                                        if (e.propertyName === 'transform') {
                                                            // finalizar troca
                                                            mainImg.src = nextSrc;
                                                            mainImg.style.transition = 'none';
                                                            mainImg.style.transform = 'translateX(0)';
                                                            temp.remove();
                                                        }
                                                    }, { once: true });
                                                } else {
                                                    // Primeiro load ou mesma imagem
                                                    mainImg.style.display = '';
                                                    mainImg.style.transition = 'opacity .35s ease';
                                                    mainImg.onload = null; // já pre-carregado
                                                    mainImg.src = nextSrc;
                                                    requestAnimationFrame(() => {
                                                        mainImg.style.opacity = '1';
                                                    });
                                                }
                                            };
                                            preload.onerror = function () {
                                                if (loadingEl) loadingEl.textContent = t('image_load_error');
                                                if (Array.isArray(produto.fotos) && produto.fotos.length) {
                                                    produto.fotos.splice(targetIdx, 1);
                                                }
                                                if (!produto.fotos || produto.fotos.length === 0) {
                                                    if (mainImg) {
                                                        mainImg.src = FALLBACK_MEDIA;
                                                        mainImg.style.display = 'none';
                                                    }
                                                    if (imageCounter) imageCounter.textContent = '0/0';
                                                    if (imageDots) imageDots.innerHTML = '';
                                                    if (imageThumbnails) imageThumbnails.innerHTML = '';
                                                    if (loadingEl) loadingEl.textContent = t('no_image');
                                                    return;
                                                }
                                                const nextIdx = targetIdx >= produto.fotos.length ? 0 : targetIdx;
                                                showImage(nextIdx);
                                            };
                                            preload.src = nextSrc;
                                            if (!hasCurrent) {
                                                // estado inicial: mostra imagem principal transparente até preload terminar
                                                mainImg.style.display = '';
                                                mainImg.style.opacity = '0';
                                            }
                                        }
                                        if (imageCounter) imageCounter.textContent = (currentImgIdx + 1) + '/' + produto.fotos.length;
                                        if (imageDots) {
                                            imageDots.innerHTML = '';
                                            for (let i = 0; i < produto.fotos.length; i++) {
                                                const dot = document.createElement('span');
                                                dot.style.display = 'inline-block';
                                                dot.style.width = '8px';
                                                dot.style.height = '8px';
                                                dot.style.margin = '0 2px';
                                                dot.style.borderRadius = '50%';
                                                dot.style.background = i === currentImgIdx ? '#ff2d55' : '#ddd';
                                                dot.style.cursor = 'pointer';
                                                dot.addEventListener('click', () => showImage(i));
                                                imageDots.appendChild(dot);
                                            }
                                        }
                                        if (imageThumbnails) {
                                            imageThumbnails.innerHTML = '';
                                            for (let i = 0; i < produto.fotos.length; i++) {
                                                const thumb = document.createElement('img');
                                                thumb.src = produto.fotos[i];
                                                thumb.alt = `${t('thumbnail')} ${i + 1}`;
                                                thumb.style.width = '40px';
                                                thumb.style.height = '40px';
                                                thumb.style.objectFit = 'cover';
                                                thumb.style.margin = '0 2px';
                                                thumb.style.border = i === currentImgIdx ? '2px solid #ff2d55' : '1px solid #ededed';
                                                thumb.style.borderRadius = '6px';
                                                thumb.style.cursor = 'pointer';
                                                thumb.onerror = () => {
                                                    thumb.onerror = null;
                                                    thumb.src = FALLBACK_MEDIA;
                                                };
                                                thumb.addEventListener('click', () => showImage(i));
                                                imageThumbnails.appendChild(thumb);
                                            }
                                        }
                                    }
                                    if (btnPrev) btnPrev.onclick = () => showImage(currentImgIdx - 1);
                                    if (btnNext) btnNext.onclick = () => showImage(currentImgIdx + 1);
                                    // --- Swipe/touch support ---
                                    if (imageContainer) {
                                        let touchStartX = 0;
                                        let touchEndX = 0;
                                        let touchMoved = false;
                                        imageContainer.addEventListener('touchstart', function (e) {
                                            if (e.touches.length === 1) {
                                                touchStartX = e.touches[0].clientX;
                                                touchMoved = false;
                                            }
                                        });
                                        imageContainer.addEventListener('touchmove', function (e) {
                                            if (e.touches.length === 1) {
                                                touchEndX = e.touches[0].clientX;
                                                touchMoved = true;
                                            }
                                        });
                                        imageContainer.addEventListener('touchend', function (e) {
                                            if (!touchMoved) return;
                                            const deltaX = touchEndX - touchStartX;
                                            if (Math.abs(deltaX) > 40) { // threshold for swipe
                                                if (deltaX < 0) {
                                                    // Swipe left: next image
                                                    showImage(currentImgIdx + 1);
                                                } else if (deltaX > 0) {
                                                    // Swipe right: previous image
                                                    showImage(currentImgIdx - 1);
                                                }
                                            }
                                        });
                                    }
                                    // --- End swipe/touch support ---
                                    showImage(0);
                                    scanImagesOnce();
                                }, 0);
                                // --- Fim da lógica de carrossel ---
                            }
                        });
                });

            const seguirBtn = document.getElementById('seguirBtn');
            seguirBtn.addEventListener('click', () => {
                seguirBtn.textContent = t('following');
            });
        </script>


        <section id="descricao-produto" style="padding: 16px;">
            <h3 style="margin-top: 20px; margin-bottom: 12px; font-size: 16px; font-weight: 700; color:#111; border-left: 3px solid #fe2d55; padding-left: 10px;">Descrição</h3>
            <div id="desc-collapse-wrapper" style="position:relative;">
                <div id="descricao-produto-dinamica"
                    style="white-space: pre-line; line-height: 1.7; font-size: 15px; color: #333; background: #fafbfc; border-radius: 10px; padding: 18px 16px; margin-bottom: 0; box-shadow: 0 2px 8px #0001; max-height: 240px; overflow: hidden;">
                </div>
                <div id="desc-fade" style="position:absolute;bottom:0;left:0;right:0;height:64px;background:linear-gradient(to bottom,transparent,#fafbfc);border-radius:0 0 10px 10px;pointer-events:none;"></div>
            </div>
            <button id="desc-ver-mais" onclick="toggleDescricao()" style="width:100%;text-align:center;font-size:14px;font-weight:500;color:#444;padding:10px 0 4px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">Ver mais <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></button>
            <h3 style="margin-top: 20px; margin-bottom: 12px; font-size: 16px; font-weight: 600;">Especificações Técnicas</h3>
            <div id="especificacoes-produto"></div>
            <h3 style="margin-top: 20px; margin-bottom: 12px; font-size: 16px; font-weight: 600;">Diferenciais</h3>
            <div id="diferenciais-produto"></div>
            <h3 style="margin-top: 20px; margin-bottom: 12px; font-size: 16px; font-weight: 600;">Garantia            </h3>
            <div id="garantia-produto"></div>
        </section>
    </div>

            <section id="recomendacoes" style="padding:16px;margin-top:4px;">
        <p style="font-size:15px;font-weight:700;color:#111;margin-bottom:12px;padding:0 2px;border-left:3px solid #fe2d55;padding-left:10px;">Você também pode gostar</p>
        <div id="recomendacoes-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;"></div>
    </section>
    <script>
    (function () {
      function fmt(v) { return Number(v || 0).toFixed(2).replace('.', ','); }
      function pct(p) {
        var preco = Number(p.preco || 0), comp = Number(p.preco_comparacao || p.precoComparacao || 0);
        return comp > preco ? Math.round(((comp - preco) / comp) * 100) : Math.round(Number(p.desconto || 0));
      }
      function cardHtml(p) {
        var img = (Array.isArray(p.fotos) && p.fotos[0]) ? p.fotos[0] : '';
        var url = 'produto.html?produto_id=' + encodeURIComponent(p.id);
        return '<div onclick="window.location.href=\'' + url + '\'" style="background:#fff;border:1px solid #f3f4f6;border-radius:12px;padding:10px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.06);min-width:0;">'
          + '<div style="width:100%;height:140px;margin-bottom:8px;border-radius:6px;overflow:hidden;background:#f9f9f9;"><img src="' + img + '" alt="" style="width:100%;height:100%;object-fit:contain;display:block;" loading="lazy"></div>'
          + '<div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;"><div>'
          + '<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><img src="/uploads/tagoficial.png" style="height:12px;width:auto;"><img src="/uploads/tagtorcer.png" style="height:12px;width:auto;"></div>'
          + '<div style="font-size:12px;font-weight:600;color:#111;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:5px;height:32px;">' + (p.titulo || '') + '</div>'
          + '<div style="display:flex;gap:3px;margin-bottom:4px;"><span style="background:#ffd0d9;color:#d6003a;font-size:9.5px;font-weight:700;padding:0 5px;border-radius:3px;display:inline-flex;align-items:center;gap:2px;height:15px;"><img src=\'/uploads/bilhete.png?v=2\' width=\'9\' height=\'9\'/>' + pct(p) + '% OFF</span></div>'
          + '<div style="margin-bottom:4px;"><span style="background:#b2f0f5;color:#006875;font-size:9.5px;font-weight:700;padding:0 5px;border-radius:3px;height:15px;display:inline-flex;align-items:center;">Frete grátis</span></div>'
          + '<div style="display:flex;align-items:center;gap:3px;margin-bottom:4px;"><span style="color:#f59e0b;font-size:11px;">★</span><span style="font-size:10px;color:#6b7280;">' + (p.notas || '5') + ' | ' + (p.quantidade_produtos || 0) + ' vendido(s)</span></div>'
          + '</div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;"><div><div style="font-size:16px;font-weight:700;color:#fe2d55;">R$ ' + fmt(p.preco) + '</div>'
          + '<div style="font-size:10px;color:#9ca3af;text-decoration:line-through;">R$ ' + fmt(Number(p.preco_comparacao || p.precoComparacao || p.preco)) + '</div></div>'
          + '<button onclick="event.stopPropagation();_recOpenModal(' + p.id + ')" style="background:#ffe0e6;border:none;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;"><img src="/uploads/carrinho-rosa.png?v=3" style="width:28px;height:28px;object-fit:contain;"></button>'
          + '</div></div></div>';
      }
      document.addEventListener('DOMContentLoaded', function () {
        var atualId = new URLSearchParams(location.search).get('produto_id');
        fetch('produtos.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : []; })
          .then(function (list) {
            var grid = document.getElementById('recomendacoes-grid');
            if (!grid) return;
            grid.innerHTML = list.filter(function (p) { return String(p.id) !== String(atualId); }).slice(0, 4).map(cardHtml).join('');
          });
      });
    })();
    function _recOpenModal(id) {
      fetch('produtos.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : []; })
        .then(function (list) {
          var p = list.find(function (x) { return String(x.id) === String(id); });
          if (!p) return;
          if (typeof normalizarProduto === 'function' && typeof abrirModalProduto === 'function') {
            abrirModalProduto(normalizarProduto(p));
          } else {
            window.location.href = 'produto.html?produto_id=' + encodeURIComponent(id);
          }
        });
    }
    </script>

<!-- Modal de tela cheia para imagens -->
    <div id="fullscreen-container" class="fullscreen-modal">
        <span class="close-fullscreen" id="fullscreen-close">&times;</span>
        <div class="fullscreen-content">
            <img id="fullscreen-image" class="fullscreen-image" src="#" alt="Imagem do produto em tela cheia">
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer" style="padding:14px 16px calc(14px + env(safe-area-inset-bottom)); margin-bottom:82px; border-top:1px solid #ececec; background:#fff;">
        <div style="max-width:680px; margin:0 auto; text-align:center; color:#5f6368; font-size:12px; line-height:1.45;">
            <strong style="display:block; color:#23272f; font-size:12px; margin-bottom:6px;">Políticas e Privacidade</strong>
            <a href="/politica-de-privacidade.php" target="_blank" rel="noopener noreferrer" style="color:#0f62fe; text-decoration:underline; font-weight:600;">Política de Privacidade</a>
            <span style="display:block; margin-top:6px;">Seus dados são tratados conforme a legislação vigente e usados apenas para processar pedidos e atendimento.</span>
        </div>
    </footer>
    <!-- Share Overlay -->
    <div id="share-overlay" class="share-overlay" onclick="closeShareSection()"></div>

            <!-- Override final para colar totalmente os cards da seção "Mais desta loja" -->
            <style>
                /* Ajuste: mais espaço entre cards e cantos levemente arredondados */
                .mais-desta-loja-carousel {gap:6px!important; column-gap:6px!important;}
                .mais-desta-loja-card {margin:0!important; padding:0!important; align-items: stretch !important;}
                .mais-desta-loja-card + .mais-desta-loja-card {margin-left:0!important;}
                .mais-desta-loja-card .img-wrap {margin:0!important; padding:0!important; border-radius:6px!important; overflow:hidden; background:#fff;}
                .mais-desta-loja-card .img-wrap img {border-radius:0!important;}
                /* Forçar valores no canto esquerdo e evitar centralização herdada */
                .mais-desta-loja-card .valores {align-items:flex-start!important; align-self:flex-start!important; text-align:left!important; padding-left:2px!important;}
                .mais-desta-loja-card .valores .preco,
                .mais-desta-loja-card .valores .desconto {text-align:left!important; width:auto!important;}
                /* Cores finais: preço preto, desconto rosa */
                .mais-desta-loja-card .valores .preco { color:#000 !important; }
                .mais-desta-loja-card .valores .desconto { color:#ff2d55 !important; }
            </style>

    <div id="share-section" class="share-section">
        <div class="share-header">
            <span class="share-title">Compartilhar</span>
            <button class="share-close" onclick="closeShareSection()">×</button>
        </div>
        <div class="share-options">
            <div class="share-option" onclick="copyLink(event)">
                <div class="share-icon copy">
                    <img src="/uploads/link.png" alt="Copiar Link"
                        style="width: 80%; height: 80%; object-fit: contain; display: block;">
                </div>
                <span class="share-label" id="copy-link-btn">Copiar Link</span>
            </div>
            <div class="share-option" onclick="copyLink()">
                <div class="share-icon">
                    <img src="/uploads/whatsapp.png" alt="WhatsApp"
                        style="width: 80%; height: 80%; object-fit: contain; display: block;">
                </div>
                <span class="share-label">WhatsApp</span>
            </div>
            <!-- [AQUI VEM O BASE64 DO INSTAGRAM - COPIE DO PRIMEIRO HTML] -->
            <div class="share-option" onclick="copyLink()">
                <div class="share-icon">
                    <img src="/uploads/instagram.png" alt="Instagram"
                        style="width: 80%; height: 80%; object-fit: contain; display: block;">
                </div>
                <span class="share-label">Instagram Direct</span>
            </div>
            <!-- [AQUI VEM O BASE64 DO FACEBOOK - COPIE DO PRIMEIRO HTML] -->
            <div class="share-option" onclick="copyLink()">
                <div class="share-icon">
                    <img src="/uploads/facebook.png" alt="Facebook"
                        style="width: 80%; height: 80%; object-fit: contain; display: block;">
                </div>
                <span class="share-label">Facebook</span>
            </div>
            <!-- [AQUI VEM O BASE64 DO TELEGRAM - COPIE DO PRIMEIRO HTML] -->
            <div class="share-option" onclick="copyLink()">
                <div class="share-icon">
                    <img src="/uploads/telegrama.png" alt="Telegram"
                        style="width: 80%; height: 80%; object-fit: contain; display: block;">
                </div>
                <span class="share-label">Telegram</span>
            </div>
        </div>
        <button class="share-cancel" onclick="closeShareSection()">Cancelar</button>
    </div>

    <!-- [AQUI VEM O COMPLAINT SECTION - COPIE DO PRIMEIRO HTML] -->
    <div id="complaint-overlay" class="complaint-overlay" onclick="closeComplaintSection()"></div>

    <div id="complaint-section" class="complaint-section">
        <div class="share-options">
            <button onclick="window.location.href='denuncia/index.html'"
                style="display: flex; gap: 5px; width: 100%;"><svg style=" font-weight: bold;" width="24px"
                    height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <rect width="24" height="24" fill="white"></rect>
                        <g filter="url(#filter0_d_15_295)">
                            <path
                                d="M4.5 21V16M4.5 16V6.5C5.5 5.5 7 5 8.5 5C11.5 5 13.5 7.5 17.5 5.5V15.5C13.5 17.5 11.5 14.5 8.5 14.5C7.5 14.5 5.5 15 4.5 16Z"
                                stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                        <defs>
                            <filter id="filter0_d_15_295" x="3" y="4.5" width="16" height="19"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha">
                                </feColorMatrix>
                                <feOffset dy="1"></feOffset>
                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0">
                                </feColorMatrix>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_295">
                                </feBlend>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_295"
                                    result="shape"></feBlend>
                            </filter>
                        </defs>
                    </g>
                </svg> Denunciar</button>
        </div>
    </div>
    <button id="back-to-top" style="
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 40px;  /* Diminuído de 50px para 40px */
    height: 40px; /* Diminuído de 50px para 40px */
    border-radius: 50%;
    background: white;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* Sombra mais suave */
    cursor: pointer;
    z-index: 999;
    align-items: center;
    justify-content: center;
    font-size: 18px; 
    transition: all 0.3s ease;
">
        <img src="/uploads/carregar-seta-para-cima.png" alt="Voltar ao topo" width="24" height="24"
            style="display:block; transform: rotate(360deg); filter: drop-shadow(0 0 1px rgba(0,0,0,0.4));">
    </button>

    <!-- ...modal de carrinho removido... -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js"></script>

    <script src="js/cupons.js"></script>
    <script src="js/script.js?v=1788753804"></script>
    <script src="js/cart.js?v=1788753804"></script>
    <script>
        // Garante que o botão "Adicionar ao Carrinho" fora do modal NUNCA adiciona ao carrinho, só abre o modal
        document.addEventListener('DOMContentLoaded', function () {
            // Remove qualquer listener antigo e impede submit acidental
            const btnAddCart = document.getElementById('add-to-cart-btn');
            if (btnAddCart) {
                btnAddCart.type = 'button';
                btnAddCart.onclick = null;
                btnAddCart.onmousedown = null;
                btnAddCart.onmouseup = null;
                btnAddCart.onkeypress = null;
                btnAddCart.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Nunca adiciona ao carrinho aqui!
                    fetch(withCacheBust('produtos.json'), { cache: 'no-store' })
                        .then(resp => resp.ok ? resp.json() : null)
                        .then(produtos => {
                            if (Array.isArray(produtos)) {
                                let produto = produtos[0];
                                const paramId = (new URL(window.location.href)).searchParams.get('produto_id');
                                if (paramId !== null) {
                                    const found = produtos.find(p => String(p.id) === String(paramId));
                                    if (found) produto = found;
                                }
                                abrirModalProduto(normalizarProduto(produto));
                            }
                        });
                    return false;
                }, true);
            }
            // Botão "Comprar Agora" fora do modal também só abre o modal
            const btnBuyNow = document.getElementById('buy-now-btn');
            if (btnBuyNow) {
                btnBuyNow.type = 'button';
                btnBuyNow.onclick = null;
                btnBuyNow.onmousedown = null;
                btnBuyNow.onmouseup = null;
                btnBuyNow.onkeypress = null;
                btnBuyNow.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    fetch(withCacheBust('produtos.json'), { cache: 'no-store' })
                        .then(resp => resp.ok ? resp.json() : null)
                        .then(produtos => {
                            if (Array.isArray(produtos)) {
                                let produto = produtos[0];
                                const paramId = (new URL(window.location.href)).searchParams.get('produto_id');
                                if (paramId !== null) {
                                    const found = produtos.find(p => String(p.id) === String(paramId));
                                    if (found) produto = found;
                                }
                                abrirModalProduto(normalizarProduto(produto));
                            }
                        });
                    return false;
                }, true);
            }
            // Remove qualquer submit de formulário na página
            document.querySelectorAll('form').forEach(f => {
                f.onsubmit = function (e) { e.preventDefault(); return false; };
            });
        });
        // Removido wrapper duplicado de comprarAgora para evitar adição dupla ao carrinho
    </script>
    <!-- Lógica do modal de variações clonada do index.html -->
    <script>
        let produtoSelecionado = null;
        let modalProdutoAtual = null;
        let variacoesSelecionadasPorTipo = {};
        // Guarda a posição de scroll para travar o fundo quando o modal abrir
        let bodyScrollY = 0;

        // ── Faixa dinâmica de preço ──────────────────────────────────────
        var _countdownFaixaTimer = null;
        function iniciarCountdownFaixa(dataFim) {
            if (_countdownFaixaTimer) clearInterval(_countdownFaixaTimer);
            var el = document.getElementById('countdown-timer');
            if (!el) return;
            function update() {
                var now = new Date().getTime();
                var fim;
                if (typeof dataFim === 'number') {
                    fim = dataFim > 1e10 ? dataFim : dataFim * 1000;
                } else {
                    fim = new Date(dataFim).getTime();
                }
                var diff = fim - now;
                if (diff <= 0) { el.textContent = 'Encerrado'; clearInterval(_countdownFaixaTimer); return; }
                var d = Math.floor(diff / 86400000);
                var h = Math.floor((diff % 86400000) / 3600000);
                var m = Math.floor((diff % 3600000) / 60000);
                var s = Math.floor((diff % 60000) / 1000);
                el.textContent = d > 0
                    ? 'Termina em ' + d + (d === 1 ? ' dia' : ' dias')
                    : 'Termina em ' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
            }
            update();
            _countdownFaixaTimer = setInterval(update, 1000);
        }
        function atualizarFaixa(produto) {
            var wrapO = document.getElementById('faixa-preco-wrap');
            var wrapR = document.getElementById('faixa-relampago-wrap');
            var isPromo = !!(produto && produto.promo_ativa);
            var isOficial = !!(window.EXIBIR_TAG_OFICIAL);
            // Mostra o bloco correto
            if (isPromo) {
                if (wrapO) wrapO.style.display = 'none';
                if (wrapR) wrapR.style.display = 'block';
            } else if (isOficial) {
                if (wrapO) wrapO.style.display = 'block';
                if (wrapR) wrapR.style.display = 'none';
            } else {
                if (wrapO) wrapO.style.display = 'none';
                if (wrapR) wrapR.style.display = 'none';
            }
            if (!produto) return;
            var preco = Number(produto.preco || 0);
            var precoComp = Number(produto.preco_comparacao || 0);
            var descRaw = Number(produto.desconto || 0);
            var desc = descRaw ? Math.round(descRaw) : (precoComp > preco ? Math.round((precoComp - preco) / precoComp * 100) : 0);
            var fmtBRL = function(v) { return v.toLocaleString('pt-BR', {minimumFractionDigits:2,maximumFractionDigits:2}); };
            var descStr = desc ? '-' + desc + '%' : '';
            var precoStr = preco ? 'R$ ' + fmtBRL(preco) : '';
            var hasComp = precoComp && precoComp > preco;
            var compStr = hasComp ? 'R$ ' + fmtBRL(precoComp) : 'R$ 0,00';
            // Atualiza bloco oficial
            var dpO = document.getElementById('discount-percent');
            var pcO = document.getElementById('price-current');
            var pCpO = document.getElementById('price-compare');
            if (dpO) dpO.textContent = descStr;
            if (pcO) { pcO.textContent = precoStr; pcO.style.color = '#f0c896'; }
            if (pCpO) { pCpO.textContent = compStr; pCpO.style.color = hasComp ? 'rgba(240,200,150,0.6)' : 'transparent'; }
            // Atualiza bloco relâmpago
            var dpR = document.getElementById('discount-percent-r');
            var pcR = document.getElementById('price-current-r');
            var pCpR = document.getElementById('price-compare-r');
            if (dpR) { dpR.textContent = descStr; dpR.style.color = '#f0500f'; }
            if (pcR) { pcR.textContent = precoStr; pcR.style.color = '#ffffff'; }
            if (pCpR) { pCpR.textContent = compStr; pCpR.style.color = hasComp ? 'rgba(255,255,255,0.7)' : 'transparent'; }
        }

    function formatBRL(value) {
      const number = Number(value || 0);
      return number.toFixed(2).replace('.', ',');
    }

    function calcularDesconto(preco, precoComparacao) {
      const valorPreco = Number(preco || 0);
      const valorComparacao = Number(precoComparacao || 0);
      if (!valorComparacao || valorComparacao <= valorPreco) {
        return 0;
      }
      return Math.round(((valorComparacao - valorPreco) / valorComparacao) * 100);
    }

    function buildGalleryImages(primary, extras = []) {
      const list = [];
      const add = (value) => {
        if (!value) return;
        const resolved = resolveMediaPath(value);
        if (resolved && !list.includes(resolved)) list.push(resolved);
      };
      add(primary);
      if (Array.isArray(extras)) {
        extras.forEach(add);
      }
      if (!list.length) {
        list.push(FALLBACK_MEDIA);
      }
      return list;
    }


        // Adiciona mini loading e animação ao abrir o modal do carrinho
    function normalizarProduto(produto) {
      // Corrige inicialização das variáveis principais do produto
      const fotos = Array.isArray(produto.fotos) ? produto.fotos : (produto.imagens || produto.imagem ? [produto.imagem] : []);
      const imagemPrincipal = resolveMediaPath(produto.imagemPrincipal || fotos[0] || produto.imagem || '');
      const preco = Number(produto.preco ?? 0);
      let precoComparacao = Number(produto.preco_comparacao ?? produto.precoComparacao ?? 0);
      if (!precoComparacao || isNaN(precoComparacao) || precoComparacao <= preco) {
        precoComparacao = preco;
      }
      let desconto = Number(produto.desconto ?? 0);
      if (!desconto || isNaN(desconto) || desconto === 0) {
        desconto = (precoComparacao > preco && precoComparacao > 0) ? Math.round(((precoComparacao - preco) / precoComparacao) * 100) : 0;
      }
      const variacoes = Array.isArray(produto.variacoes) ? produto.variacoes.map((variacao) => {
        const variacaoPreco = Number(variacao.preco ?? preco);
        let variacaoComparacao = Number(variacao.preco_comparacao ?? variacao.precoComparacao ?? precoComparacao ?? variacaoPreco);
        if (!variacaoComparacao || isNaN(variacaoComparacao) || variacaoComparacao <= variacaoPreco) {
          variacaoComparacao = precoComparacao > variacaoPreco ? precoComparacao : variacaoPreco;
        }
        let variacaoDesconto = Number(variacao.desconto ?? 0);
        if (!variacaoDesconto || isNaN(variacaoDesconto) || variacaoDesconto === 0) {
          variacaoDesconto = (variacaoComparacao > variacaoPreco && variacaoComparacao > 0) ? Math.round(((variacaoComparacao - variacaoPreco) / variacaoComparacao) * 100) : 0;
        }
        return {
          id: variacao.id ?? null,
          titulo: variacao.titulo ?? '',
          tipo: variacao.tipo ?? 'tamanho',
          preco: variacaoPreco,
          precoComparacao: variacaoComparacao,
          desconto: variacaoDesconto,
          info: variacao.info ?? '',
          checkoutLink: variacao.link_checkout ?? '',
          imagem: resolveMediaPath(variacao.imagem ?? fotos[0] ?? ''),
          label: variacao.info || variacao.titulo || 'Opção'
        };
      }) : [];
      return {
        id: produto.id ?? null,
        titulo: produto.titulo ?? '',
        preco,
        precoComparacao,
        desconto,
        notas: produto.notas ?? '',
        descricao: produto.descricao ?? '',
        vendidos: Number(produto.quantidade_produtos ?? 0),
        imagemPrincipal,
        fotos: fotos.map(resolveMediaPath),
        variacoes,
        status: produto.status ?? 'ativo',
        checkoutUrl: 'checkout.html?produto_id=' + encodeURIComponent(produto.id ?? ''),
        // Página do produto (relativa) — usada para abrir a página de detalhe
        pageUrl: 'produto.html?produto_id=' + encodeURIComponent(produto.id ?? ''),
        promo_ativa: !!produto.promo_ativa
      };
    }

    function abrirModal() {
      const modal = document.getElementById('meuModal');
      if (!modal) return;
      // Trava o scroll do fundo (compatível com iOS)
      bodyScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${bodyScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      modal.style.display = 'flex';
    }

    function fecharModal() {
      const modal = document.getElementById('meuModal');
      if (modal) modal.style.display = 'none';
      // Destrava o scroll do fundo e restaura posição
      document.body.style.removeProperty('position');
      const top = document.body.style.top;
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('left');
      document.body.style.removeProperty('right');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('overflow');
      const y = top ? parseInt(top, 10) : 0;
      window.scrollTo(0, (y && !Number.isNaN(y)) ? -y : (bodyScrollY || 0));
      produtoSelecionado = null;
      variacoesSelecionadasPorTipo = {};
    }
    // Fecha meuModal ao pressionar Escape
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            var m = document.getElementById('meuModal');
            if (m && m.style.display !== 'none') fecharModal();
        }
    });

    function showCenterToast(message, type = 'success', duration = 2000) {
      const toast = document.createElement('div');
      toast.className = 'toast-center';
      if (type === 'text') {
        toast.innerHTML = `<span class="toast-text" style="font-size:14px;font-weight:600;line-height:1.45;">${message}</span>`;
      } else {
        const icons = {
          success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
          error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
          info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>`
        };
        const iconEl = `<span class="toast-icon ${type}">${icons[type] || icons.info}</span>`;
        toast.innerHTML = `${iconEl}<span class="toast-text">${message}</span>`;
      }
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
      }, duration);
    }

        // Utilitário: mantém o bloco de compra flutuando dentro do modal, acompanhando o scroll
        let _buyFloatCleanup = null;
        function setupFloatingBuyPosition() {
            const modalBox = document.querySelector('#meuModal > .bg-white');
            const floatBox = document.getElementById('modal-buy-floating');
            if (!modalBox || !floatBox) return;
            floatBox.style.position = 'absolute';
            floatBox.style.right = '18px';
            floatBox.style.left = 'auto';
            floatBox.style.bottom = '';
            const update = () => {
                const h = floatBox.offsetHeight || 0;
                const top = modalBox.scrollTop + modalBox.clientHeight - h - 18;
                floatBox.style.top = top + 'px';
            };
            // Limpa listeners antigos se houver
            if (typeof _buyFloatCleanup === 'function') { _buyFloatCleanup(); }
            update();
            modalBox.addEventListener('scroll', update);
            window.addEventListener('resize', update);
            let ro;
            if ('ResizeObserver' in window) {
                ro = new ResizeObserver(update);
                ro.observe(modalBox);
                ro.observe(floatBox);
            }
            _buyFloatCleanup = () => {
                modalBox.removeEventListener('scroll', update);
                window.removeEventListener('resize', update);
                if (ro) try { ro.disconnect(); } catch (e) { }
            };
        }

    function renderVariacoes(variacoes = []) {
      const grid = document.getElementById('grid-variacoes');
      if (!grid) return;
      grid.innerHTML = '';
      variacoesSelecionadasPorTipo = {};

      if (!variacoes.length) {
        const aviso = document.createElement('p');
        aviso.className = 'text-sm text-gray-500';
        aviso.textContent = t('no_variations');
        grid.appendChild(aviso);
        return;
      }

      // Agrupa variações por tipo e já normaliza dados usados no modal.
      const grupos = {};
      variacoes.forEach((v, idx) => {
        const tipo = String(v.tipo || 'variacao').toLowerCase();
        if (!grupos[tipo]) grupos[tipo] = [];

        const preco = Number(v.preco ?? 0);
        let precoComparacao = Number(v.precoComparacao ?? v.preco_comparacao ?? preco);
        if (!precoComparacao || Number.isNaN(precoComparacao) || precoComparacao <= 0) {
          precoComparacao = preco;
        }

        let desconto = Number(v.desconto ?? 0);
        if (!desconto || Number.isNaN(desconto)) {
          desconto = calcularDesconto(preco, precoComparacao);
        }

        grupos[tipo].push({
          ...v,
          idx,
          tipo,
          titulo: v.titulo ?? '',
          preco,
          precoComparacao,
          desconto,
          checkoutLink: v.checkoutLink || v.link_checkout || '',
          imagem: resolveMediaPath(v.imagem || (modalProdutoAtual?.imagemPrincipal || ''))
        });
      });

      Object.keys(grupos).forEach((tipo) => {
        // Título do grupo com count e guia de tamanhos
        const labelText = tipo === 'cor' ? 'Cor' : tipo === 'tamanho' ? 'Tamanho' : tipo.charAt(0).toUpperCase() + tipo.slice(1);
        const count = grupos[tipo].length;
        const groupTitle = document.createElement('div');
        groupTitle.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin:10px 0 8px;';
        const titleLeft = document.createElement('span');
        titleLeft.style.cssText = 'font-size:14px;font-weight:700;color:#111;';
        titleLeft.textContent = labelText + ' (' + count + ')';
        groupTitle.appendChild(titleLeft);
        if (tipo === 'tamanho') {
          const guia = document.createElement('span');
          guia.style.cssText = 'font-size:13px;color:#1890ff;cursor:pointer;';
          guia.textContent = 'Guia de tamanhos';
          groupTitle.appendChild(guia);
        }
        grid.appendChild(groupTitle);

        // Container de opções
        const row = document.createElement('div');
        const isCor = tipo === 'cor';
        const isTamanho = tipo === 'tamanho';
        row.className = isCor ? 'variation-row-grid' : 'variation-row scrollbar-hide';

        const groupGallery = buildGalleryImages(
          modalProdutoAtual?.imagemPrincipal || '',
          grupos[tipo].map((v) => v.imagem || '')
        );

        grupos[tipo].forEach((variacao, optionIndex) => {
          const btn = document.createElement('div');
          btn.className = `variation-card${tipo === 'tamanho' ? ' is-size' : ''}`;
          btn.setAttribute('role', 'button');
          btn.setAttribute('tabindex', '0');
          btn.setAttribute('data-index', String(variacao.idx));
          btn.setAttribute('data-tipo', variacao.tipo);
          btn.setAttribute('data-variacao-id', String(variacao.id ?? ''));
          btn.setAttribute('data-variation', '1');

          const imageWrap = document.createElement('div');
          imageWrap.className = 'variation-image-wrap';

          const imageEl = document.createElement('img');
          imageEl.className = 'variation-image';
          imageEl.alt = variacao.titulo;
          imageEl.src = variacao.imagem || FALLBACK_MEDIA;
          imageEl.loading = 'lazy';
          imageEl.onerror = () => {
            imageEl.onerror = null;
            imageEl.src = FALLBACK_MEDIA;
          };
          imageWrap.appendChild(imageEl);

          const zoomBtn = document.createElement('button');
          zoomBtn.type = 'button';
          zoomBtn.className = 'variation-zoom';
          zoomBtn.innerHTML = '<i class="fas fa-up-right-and-down-left-from-center"></i>';
          zoomBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!groupGallery.length) return;
            const startIndex = Math.max(0, groupGallery.indexOf(variacao.imagem));
            openImageViewer(groupGallery, startIndex, variacao.titulo || "");
          });
          imageWrap.appendChild(zoomBtn);

          const label = document.createElement('span');
          label.className = 'variation-label';
          const words = (variacao.titulo || '').split(' ');
          label.textContent = words.length > 4 ? words.slice(0, 4).join(' ') + '…' : variacao.titulo;

          const labelWrap = document.createElement('div');
          labelWrap.className = 'variation-label-wrap';
          labelWrap.appendChild(label);

          if (tipo !== 'tamanho') { btn.appendChild(imageWrap); }
          btn.appendChild(labelWrap);

          const selecionarOpcao = () => {
            row.querySelectorAll('.variation-card.is-selected').forEach((cardSelecionado) => {
              cardSelecionado.classList.remove('is-selected');
            });
            btn.classList.add('is-selected');
            variacoesSelecionadasPorTipo[tipo] = variacao;
            atualizarResumoSelecaoModal();
          };

          btn.addEventListener('click', selecionarOpcao);
          btn.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              selecionarOpcao();
            }
          });

          row.appendChild(btn);

          if (optionIndex === 0) {
            btn.classList.add('is-selected');
            variacoesSelecionadasPorTipo[tipo] = variacao;
          }
        });

        grid.appendChild(row);
      });

      atualizarResumoSelecaoModal();

      // Quantidade no final do modal (fora do sticky); botão Comprar Agora fica flutuando sozinho
      const contentEl = document.getElementById('modal-conteudo') || grid.parentNode;
      let buyBox = document.getElementById('buy-positions');
      if (!buyBox) {
        buyBox = document.createElement('div');
        buyBox.id = 'buy-positions';
        contentEl.appendChild(buyBox);
      }
      // Deixa somente o botão no sticky
      buyBox.innerHTML = `
        <a href="javascript:void(0);" onclick="comprarAgora()" id="div_ors_4" class="w-full text-white text-center block" style="font-size:16px;font-weight:700;border-radius:999px;padding:14px;background:#ff1744;outline:none;-webkit-tap-highlight-color:transparent;box-shadow:none;">Adicionar ao carrinho</a>
      `;

      // Adiciona bloco de quantidade antes do sticky, no final do conteúdo rolável
      let qtyBox = document.getElementById('qty-row');
      if (!qtyBox) {
        qtyBox = document.createElement('div');
        qtyBox.id = 'qty-row';
        qtyBox.className = 'mt-4 mb-2';
        contentEl.insertBefore(qtyBox, buyBox);
      }
      qtyBox.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin:14px 0 12px;">
          <span style="font-size:14px;font-weight:700;color:#111;">${t('quantity')}</span>
          <div style="display:flex;align-items:center;background:#f5f5f5;border-radius:8px;overflow:hidden;">
            <button type="button" id="qtd-menos" style="width:36px;height:36px;border:none;background:transparent;font-size:20px;color:#111;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:300;">−</button>
            <input type="number" id="qtd-input" value="1" min="1" style="width:36px;text-align:center;border:none;background:transparent;font-size:15px;font-weight:700;color:#111;outline:none;" />
            <button type="button" id="qtd-mais" style="width:36px;height:36px;border:none;background:transparent;font-size:20px;color:#111;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:300;">+</button>
          </div>
        </div>
      `;

      // Lógica funcional dos botões de quantidade
      const input = qtyBox.querySelector('#qtd-input');
      const btnMenos = qtyBox.querySelector('#qtd-menos');
      const btnMais = qtyBox.querySelector('#qtd-mais');

      btnMenos.addEventListener('click', () => {
        let v = parseInt(input.value, 10) || 1;
        if (v > 1) v--;
        input.value = v;
        if (window.produtoSelecionado) {
          window.produtoSelecionado.quantidade = v;
          if (Array.isArray(window.produtoSelecionado.comboItens)) {
            window.produtoSelecionado.comboItens.forEach((item) => {
              item.quantidade = v;
            });
          }
        }
      });
      btnMais.addEventListener('click', () => {
        let v = parseInt(input.value, 10) || 1;
        v++;
        input.value = v;
        if (window.produtoSelecionado) {
          window.produtoSelecionado.quantidade = v;
          if (Array.isArray(window.produtoSelecionado.comboItens)) {
            window.produtoSelecionado.comboItens.forEach((item) => {
              item.quantidade = v;
            });
          }
        }
      });
      input.addEventListener('change', () => {
        let v = parseInt(input.value, 10);
        if (!v || v < 1) v = 1;
        input.value = v;
        if (window.produtoSelecionado) {
          window.produtoSelecionado.quantidade = v;
          if (Array.isArray(window.produtoSelecionado.comboItens)) {
            window.produtoSelecionado.comboItens.forEach((item) => {
              item.quantidade = v;
            });
          }
        }
      });

      // Atualiza quantidade no produtoSelecionado
      if (window.produtoSelecionado) {
        const quantidadeAtual = parseInt(input.value, 10) || 1;
        window.produtoSelecionado.quantidade = quantidadeAtual;
        if (Array.isArray(window.produtoSelecionado.comboItens)) {
          window.produtoSelecionado.comboItens.forEach((item) => {
            item.quantidade = quantidadeAtual;
          });
        }
      }
    }

    function atualizarResumoSelecaoModal() {
      if (!modalProdutoAtual) return;

      const variacaoCor = variacoesSelecionadasPorTipo.cor || null;
      const variacaoTamanho = variacoesSelecionadasPorTipo.tamanho || null;
      const temGrupoCor = Array.isArray(modalProdutoAtual?.variacoes)
        && modalProdutoAtual.variacoes.some((v) => String(v.tipo || '').toLowerCase() === 'cor');
      const usarTamanhoComoPrincipal = !temGrupoCor && !!variacaoTamanho;
      const variacaoPrincipal = usarTamanhoComoPrincipal ? variacaoTamanho : variacaoCor;
      const variacaoPacote = usarTamanhoComoPrincipal ? null : variacaoTamanho;

      const tituloAlbum = variacaoPrincipal?.titulo || modalProdutoAtual.titulo || '';
      const tituloPacote = variacaoPacote?.titulo || '';
      const tituloFinal = tituloPacote ? `${tituloAlbum} (${tituloPacote})` : tituloAlbum;

      const precoAlbum = Number(variacaoPrincipal?.preco ?? modalProdutoAtual.preco ?? 0);
      const precoAlbumComparacaoRaw = Number(variacaoPrincipal?.precoComparacao ?? modalProdutoAtual.precoComparacao ?? precoAlbum);
      const precoAlbumComparacao = (precoAlbumComparacaoRaw > 0) ? precoAlbumComparacaoRaw : precoAlbum;

      const precoPacote = 0;
      const precoPacoteComparacao = 0;

      const precoTotal = precoAlbum;
      const precoComparacaoTotal = precoAlbumComparacao;
      const descontoTotal = calcularDesconto(precoTotal, precoComparacaoTotal);

      const imagemAlbum = variacaoPrincipal?.imagem || modalProdutoAtual.imagemPrincipal || FALLBACK_MEDIA;
      const imagemPacote = variacaoPacote?.imagem || '';
      const imagemPrincipal = imagemAlbum;
      const fotosPrincipais = buildGalleryImages(imagemPrincipal, [
        ...(imagemAlbum ? [imagemAlbum] : []),
        ...(imagemPacote ? [imagemPacote] : []),
        ...(Array.isArray(modalProdutoAtual?.fotos) ? modalProdutoAtual.fotos : [])
      ]);

      const tituloEl = document.getElementById('div_ors_1');
      if (tituloEl) tituloEl.style.display = 'none';

      const badgeEl = document.getElementById('div_ors_badge');
      if (badgeEl) badgeEl.textContent = '-' + Math.round(descontoTotal) + '%';

      const precoEl = document.getElementById('div_ors_3');
      if (precoEl) precoEl.textContent = formatBRL(precoTotal);

      const precoCompEl = document.getElementById('div_ors_2');
      if (precoCompEl) precoCompEl.textContent = (precoComparacaoTotal > precoTotal) ? 'R$ ' + formatBRL(precoComparacaoTotal) : '';

      // Bilhete chip: percentual de desconto
      const bilheteText = document.getElementById('modal-bilhete-text');
      if (bilheteText && descontoTotal > 0) bilheteText.textContent = Math.round(descontoTotal) + '% de desconto';

      // Banner Oferta Relâmpago
      const ofertaBanner = document.getElementById('modal-oferta-banner');
      if (ofertaBanner) {
        if (modalProdutoAtual && modalProdutoAtual.promo_ativa) {
          ofertaBanner.style.display = 'flex';
        } else {
          ofertaBanner.style.display = 'none';
        }
      }

      const descontoEl = document.getElementById('div_ors_5');
      if (descontoEl) {
        descontoEl.textContent = `-${Math.round(descontoTotal)}%`;
      }

      const modalImg = document.getElementById('img-solts');
      if (modalImg) {
        if (usarTamanhoComoPrincipal) {
          modalImg.style.display = 'none';
        } else {
          modalImg.style.display = 'block';
          modalImg.onerror = () => { modalImg.onerror = null; modalImg.src = FALLBACK_MEDIA; };
          modalImg.src = imagemPrincipal || FALLBACK_MEDIA;
        }
      }

      const checkoutDefault = modalProdutoAtual?.checkoutUrl || 'checkout.html';
      const itemAlbum = {
        produtoId: modalProdutoAtual?.id ?? null,
        variacaoId: variacaoPrincipal?.id ?? null,
        tipoVariacao: usarTamanhoComoPrincipal ? 'tamanho' : 'cor',
        titulo: tituloFinal,
        preco: precoAlbum,
        precoComparacao: precoAlbumComparacao,
        desconto: calcularDesconto(precoAlbum, precoAlbumComparacao),
        link_checkout: variacaoPrincipal?.checkoutLink || checkoutDefault,
        imagem: imagemAlbum,
        fotos: buildGalleryImages(imagemAlbum, modalProdutoAtual?.fotos),
        quantidade: 1
      };

      const comboItens = [itemAlbum];

      produtoSelecionado = {
        ...itemAlbum,
        titulo: tituloFinal,
        preco: precoTotal,
        precoComparacao: precoComparacaoTotal,
        desconto: descontoTotal,
        imagem: imagemPrincipal,
        fotos: fotosPrincipais,
        quantidade: 1,
        comboItens
      };
    }

    function abrirModalProduto(produto) {
      modalProdutoAtual = produto;
      produtoSelecionado = null;
      variacoesSelecionadasPorTipo = {};
      abrirModal();

      const loader = document.getElementById('modal-loader');
      const conteudo = document.getElementById('modal-conteudo');
      if (loader && conteudo) {
        loader.classList.remove('hidden');
        conteudo.classList.add('hidden');
      }

      setTimeout(() => {


  // Monta o topo do modal mostrando desconto corretamente
  const img = document.getElementById('img-solts');
  const title = document.getElementById('div_ors_1');
  const preco = document.getElementById('div_ors_3');
  const precoComp = document.getElementById('div_ors_2');
  const desconto = document.getElementById('div_ors_5');

  const temCorInicial = Array.isArray(produto?.variacoes) && produto.variacoes.some(v => String(v.tipo || '').toLowerCase() === 'cor');
  if (img) {
    if (!temCorInicial) {
      img.style.display = 'none';
    } else {
      img.style.display = 'block';
      img.onerror = () => { img.onerror = null; img.src = FALLBACK_MEDIA; };
      img.src = produto.imagemPrincipal || FALLBACK_MEDIA;
    }
  }
  if (title) title.innerHTML = '';
  if (preco) preco.innerHTML = `<span style='background:#fe2d55;color:#fff;font-weight:700;padding:2px 8px;border-radius:6px;font-size:1.2rem;margin-right:8px;${produto.desconto ? '' : 'display:none;'}'>${produto.desconto ? '-' + Math.round(produto.desconto) + '%' : ''}</span> <span style='color:#fe2d55;font-size:1.3rem;font-weight:700;'>R$ ${formatBRL(produto.preco)}</span>`;
  if (precoComp) precoComp.innerHTML = produto.precoComparacao && produto.precoComparacao > produto.preco ? `<span style='color:#aaa;text-decoration:line-through;font-size:1rem;'>R$ ${formatBRL(produto.precoComparacao)}</span>` : '';
  if (desconto) desconto.textContent = produto.desconto ? `-${Math.round(produto.desconto)}%` : '';

        // Ajusta dimensões do modal (sem deslocar da base)
        const modal = document.querySelector('#meuModal > .bg-white');
        if (modal) {
          // Mantém o modal ancorado na base: sem margem superior
          modal.style.marginTop = '0px';
          modal.style.maxWidth = '480px';
          modal.style.borderRadius = '0px';
        }

        // Ajusta o botão fechar
        const btnClose = modal?.querySelector('button[aria-label="Fechar"]');
        if (btnClose) {
          btnClose.style.top = '18px';
          btnClose.style.right = '18px';
        }

        // Ajusta o container da imagem e título
        const flexRow = conteudo?.querySelector('.flex.flex-row.items-start.gap-3.w-full');
        if (flexRow) {
          flexRow.style.alignItems = 'flex-start';
          flexRow.style.gap = '18px';
        }
        if (img) {
          img.style.width = '90px';
          img.style.height = '90px';
          img.style.borderRadius = '12px';
          img.style.boxShadow = '0 2px 12px #0001';
        }

        // Ajusta o container de variações
        const gridVar = document.getElementById('grid-variacoes');
        if (gridVar) {
          gridVar.style.marginTop = '10px';
        }

        if (produto.variacoes.length === 0) {
          const galleryImages = buildGalleryImages(produto.imagemPrincipal, produto.fotos);
          produtoSelecionado = {
            produtoId: produto.id ?? null,
            variacaoId: null,
            titulo: produto.titulo,
            preco: produto.preco,
            precoComparacao: produto.precoComparacao,
            desconto: produto.desconto,
            link_checkout: produto.checkoutUrl,
            imagem: galleryImages[0] || FALLBACK_MEDIA,
            fotos: galleryImages,
            quantidade: 1
          };
        }

        document.getElementById('titulo-variacoes').textContent = produto.variacoes.length ? t('variations') : 'Produto';
        renderVariacoes(produto.variacoes);

        if (loader && conteudo) {
          loader.classList.add('hidden');
          conteudo.classList.remove('hidden');
        }
      }, 400);
    }

    function comprarAgora() {
      if (!produtoSelecionado) {
        showCenterToast(t('select_variation_first'), 'error', 2200);
        return;
      }
      // Atualiza a quantidade do produtoSelecionado com o valor do input
      const qtdInput = document.getElementById('qtd-input');
      let quantidade = 1;
      if (qtdInput) {
        quantidade = parseInt(qtdInput.value, 10);
        if (!quantidade || quantidade < 1) quantidade = 1;
      }
      produtoSelecionado.quantidade = quantidade;

      const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      const itensParaAdicionar = (Array.isArray(produtoSelecionado.comboItens) && produtoSelecionado.comboItens.length)
        ? produtoSelecionado.comboItens
        : [produtoSelecionado];

      let adicionados = 0;
      let duplicados = 0;

      itensParaAdicionar.forEach((itemBase) => {
        const item = {
          ...itemBase,
          quantidade
        };

        const existe = carrinho.some((p) =>
          String(p.titulo || '') === String(item.titulo || '')
          && String(p.variacaoId ?? '') === String(item.variacaoId ?? '')
          && String(p.tipoVariacao ?? '') === String(item.tipoVariacao ?? '')
        );

        if (existe) {
          duplicados += 1;
          return;
        }

        carrinho.push(item);
        adicionados += 1;
      });

      if (!adicionados) {
        showCenterToast(t('already_in_cart'), 'info', 2200);
        return;
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      updateCartCounter();

      animateProductToCart(function() {
        if (adicionados > 1) {
          showCenterToast(t('album_and_pack_added'), 'success', 1900);
        } else {
          showCenterToast(t('added_to_cart'), 'success', 1800);
        }
        setTimeout(function() { fecharModal(); }, 350);
        if (duplicados > 0) {
          setTimeout(() => {
            showCenterToast(t('some_items_already_in_cart'), 'info', 1800);
          }, 700);
        }
      });
    }

    function animateProductToCart(callback) {
      const img = document.getElementById('img-solts');
      const cart = document.getElementById('cart-count-header');
      if (!img || !cart) { if (callback) callback(); return; }
      const cartRect = cart.getBoundingClientRect();
      const SIZE = 64;
      const startX = window.innerWidth / 2 - SIZE / 2;
      const startY = window.innerHeight - 100;
      const clone = img.cloneNode(true);
      clone.style.cssText = [
        'position:fixed',
        'left:' + startX + 'px',
        'top:' + startY + 'px',
        'width:' + SIZE + 'px',
        'height:' + SIZE + 'px',
        'border-radius:50%',
        'object-fit:cover',
        'box-shadow:0 2px 12px rgba(0,0,0,0.15)',
        'z-index:99999',
        'pointer-events:none',
        'opacity:1',
        'transform:scale(1)',
        'transition:none',
        'will-change:transform,opacity',
      ].join(';');
      document.body.appendChild(clone);
      // Força reflow antes de ativar a transição
      clone.getBoundingClientRect();
      const destX = cartRect.left + cartRect.width / 2 - startX - SIZE / 2;
      const destY = cartRect.top + cartRect.height / 2 - startY - SIZE / 2;
      const scale = 0.3;
      clone.style.transition = 'transform 0.75s cubic-bezier(.4,1.4,.6,1), opacity 0.75s ease';
      clone.style.transform = 'translate(' + destX + 'px,' + destY + 'px) scale(' + scale + ')';
      clone.style.opacity = '0.5';
      setTimeout(() => {
        clone.remove();
        if (callback) callback();
      }, 780);
    }
    </script>

    <script>
        function handleOpenShareSection() {
            const shareSection = document.getElementById('share-section');
            const shareOverlay = document.getElementById('share-overlay');
            if (shareSection && shareOverlay) {
                shareOverlay.style.display = 'block';
                shareSection.style.display = 'block';

                // Prevent touch events from propagating
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';

                setTimeout(() => {
                    shareOverlay.classList.add('active');
                    shareSection.classList.add('active');
                }, 10);
            }
        }

        function handleOpenComplaintSection() {
            const complaintSection = document.getElementById('complaint-section');
            const complaintOverlay = document.getElementById('complaint-overlay');
            if (complaintSection && complaintOverlay) {
                complaintOverlay.style.display = 'block';
                complaintSection.style.display = 'block';

                // Prevent touch events from propagating
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';

                setTimeout(() => {
                    complaintOverlay.classList.add('active');
                    complaintSection.classList.add('active');
                }, 10);
            }
        }

        function closeShareSection() {
            const shareSection = document.getElementById('share-section');
            const shareOverlay = document.getElementById('share-overlay');
            if (shareSection && shareOverlay) {
                shareOverlay.classList.remove('active');
                shareSection.classList.remove('active');

                setTimeout(() => {
                    shareOverlay.style.display = 'none';
                    shareSection.style.display = 'none';
                }, 300);

                // Restore body scroll
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            }
        }

        function closeComplaintSection() {
            const complaintSection = document.getElementById('complaint-section');
            const complaintOverlay = document.getElementById('complaint-overlay');
            if (complaintSection && complaintOverlay) {
                complaintOverlay.classList.remove('active');
                complaintSection.classList.remove('active');

                setTimeout(() => {
                    complaintOverlay.style.display = 'none';
                    complaintSection.style.display = 'none';
                }, 300);

                // Restore body scroll
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            }
        }

        async function copyLink() {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const copyBtn = document.getElementById('copy-link-btn');
                if (copyBtn) {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = t('link_copied');
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 1500);
                }
            } catch (e) {
                // Fallback para navegadores mais antigos
                const tempInput = document.createElement('input');
                const url = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.value = url;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert(t('link_copied'));
            }
            // Fecha com animação suave
            closeShareSection();
        }

        seguirBtn.addEventListener('click', () => {
            seguirBtn.textContent = t('following');
        });

        document.addEventListener('DOMContentLoaded', function () {
            // Inicialização do modal de tela cheia (se existir)
            const fullscreenContainer = document.getElementById('fullscreen-container');
            const fullscreenClose = document.getElementById('fullscreen-close');

            if (fullscreenClose && fullscreenContainer) {
                fullscreenClose.addEventListener('click', closeFullscreen);
                fullscreenContainer.addEventListener('click', (e) => {
                    if (e.target === fullscreenContainer) {
                        closeFullscreen();
                    }
                });
            }
        });
    </script>


    <script>
    (function() {
        var TAB_SECTIONS = [
            'visao-geral-section',
            'creator-videos',
            'avaliacoes-section',
            'descricao-produto',
            'recomendacoes'
        ];
        function getBar() { return document.getElementById("sticky-tabs"); }
        function getTabs() { var b=getBar(); return b?Array.from(b.querySelectorAll(".tab")):[]; }
        function setActive(idx) { getTabs().forEach(function(t,i){ t.classList.toggle("active",i===idx); }); }
        function scrollTo(id) {
            var el = document.getElementById(id);
            var bar = getBar();
            if (!el) return;
            var barH = bar ? bar.offsetHeight : 48;
            var top = el.getBoundingClientRect().top + window.pageYOffset - barH - 2;
            window.scrollTo({ top: top, behavior: "smooth" });
        }
        window.scrollToVisaoGeral      = function(){ scrollTo("visao-geral-section"); };
        window.scrollToVideosCriadores = function(){ scrollTo("creator-videos"); };
        window.scrollToAvaliacoes      = function(){ scrollTo("avaliacoes-section"); };
        window.scrollToDescription     = function(){ scrollTo("descricao-produto"); };
        window.scrollToRecomendacoes   = function(){ scrollTo("recomendacoes"); };
        function initScrollspy() {
            var bar = getBar();
            var barH = bar ? bar.offsetHeight : 48;
            var margin = "-" + barH + "px 0px -55% 0px";
            TAB_SECTIONS.forEach(function(id, idx) {
                var el = document.getElementById(id);
                if (!el) return;
                new IntersectionObserver(function(entries) {
                    if (entries[0].isIntersecting) setActive(idx);
                }, { rootMargin: margin, threshold: 0 }).observe(el);
            });
        }
        if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initScrollspy); }
        else { initScrollspy(); }
    })();
    </script>

<!-- Modal Oficial -->
<div id="modalOficial" style="display:none;position:fixed;inset:0;z-index:9998;align-items:flex-end;justify-content:center;" onclick="fecharModalOficialBg(event)">
  <div style="position:absolute;inset:0;background:rgba(0,0,0,.55);"></div>
  <div id="modalOficialContent" style="position:relative;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;border-radius:22px 22px 0 0;-webkit-overflow-scrolling:touch;background:radial-gradient(ellipse 75% 35% at 50% 0%,rgba(180,130,50,0.55) 0%,rgba(30,16,6,0) 65%),linear-gradient(180deg,#2a1a0c 0%,#1a0f07 40%,#120b05 100%);">
    <button onclick="fecharModalOficial()" style="position:absolute;top:14px;right:16px;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:20px;width:40px;height:40px;border-radius:999px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;">&#x2715;</button>
    <div style="display:flex;flex-direction:column;align-items:center;padding:28px 20px 20px;gap:8px;">
      <img src="/uploads/oficialcomtrevo.png" alt="TikTok Shop Oficial" style="height:110px;width:auto;max-width:100%;object-fit:contain;display:block;opacity:0.65;">
      <div style="display:flex;gap:24px;margin-top:18px;width:100%;justify-content:center;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;flex:1;max-width:90px;">
          <div style="width:52px;height:52px;border-radius:999px;background:rgba(201,168,76,.18);border:1.5px solid rgba(201,168,76,.35);display:flex;align-items:center;justify-content:center;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          </div>
          <span style="color:#c9a84c;font-size:10.5px;font-weight:600;text-align:center;line-height:1.3;">100% aut&#234;ntico</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;flex:1;max-width:90px;">
          <div style="width:52px;height:52px;border-radius:999px;background:rgba(201,168,76,.18);border:1.5px solid rgba(201,168,76,.35);display:flex;align-items:center;justify-content:center;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span style="color:#c9a84c;font-size:10.5px;font-weight:600;text-align:center;line-height:1.3;">Devolu&#231;&#227;o gratuita em 30 dias</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;flex:1;max-width:90px;">
          <div style="width:52px;height:52px;border-radius:999px;background:rgba(201,168,76,.18);border:1.5px solid rgba(201,168,76,.35);display:flex;align-items:center;justify-content:center;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <span style="color:#c9a84c;font-size:10.5px;font-weight:600;text-align:center;line-height:1.3;">Frete gr&#225;tis</span>
        </div>
      </div>
    </div>
    <div style="margin:0 16px 16px;background:rgba(255,255,255,.08);border-radius:14px;padding:16px 18px;border:1px solid rgba(201,168,76,.3);">
      <div style="color:#fff;font-size:15px;font-weight:700;margin-bottom:8px;">TikTok Shop Oficial</div>
      <div style="color:rgba(255,255,255,.75);font-size:13px;line-height:1.55;">Produtos com o selo Oficial v&#234;m diretamente dos propriet&#225;rios das marcas ou de revendedores autorizados, oferecendo benef&#237;cios como 100% de autenticidade, frete gr&#225;tis e devolu&#231;&#245;es gratuitas.</div>
    </div>
    <div style="padding:0 16px 32px;display:flex;flex-direction:column;gap:0;">
      <div style="padding:16px 0;border-bottom:1px solid rgba(201,168,76,.2);">
        <div style="color:#fff;font-size:14px;font-weight:700;margin-bottom:6px;">100% aut&#234;ntico</div>
        <div style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.55;">Produtos com este selo s&#227;o 100% aut&#234;nticos, fornecidos diretamente por propriet&#225;rios de marcas ou revendedores autorizados.</div>
      </div>
      <div style="padding:16px 0;border-bottom:1px solid rgba(201,168,76,.2);">
        <div style="color:#fff;font-size:14px;font-weight:700;margin-bottom:6px;">Devolu&#231;&#227;o gratuita em 30 dias</div>
        <div style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.55;">Devolu&#231;&#245;es gratuitas no per&#237;odo de 30 dias ap&#243;s receber seu produto. Mudan&#231;a de ideia &#233; aplic&#225;vel.</div>
      </div>
      <div style="padding:16px 0;">
        <div style="color:#fff;font-size:14px;font-weight:700;margin-bottom:6px;">Frete gr&#225;tis</div>
        <div style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.55;">O frete gr&#225;tis &#233; garantido para produtos eleg&#237;veis com um gasto m&#237;nimo.</div>
      </div>
    </div>
  </div>
</div>
<script>
function abrirModalOficial() {
  var m = document.getElementById('modalOficial');
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function fecharModalOficial() {
  var m = document.getElementById('modalOficial');
  m.style.display = 'none';
  document.body.style.overflow = '';
}
function fecharModalOficialBg(e) {
  if (e.target === document.getElementById('modalOficial')) fecharModalOficial();
}
</script>

<!-- Modal vídeo review -->
<div id="videoReviewModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);flex-direction:column;align-items:center;justify-content:center;" onclick="if(event.target===this)_fecharVideoReview()">
    <button onclick="_fecharVideoReview()" style="position:absolute;top:14px;right:16px;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:20px;width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;">&#x2715;</button>
    <button id="vrPrev" onclick="_navVideoReview(-1)" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;width:38px;height:38px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
    <video id="videoReviewPlayer" controls playsinline style="max-width:90vw;max-height:80vh;border-radius:12px;outline:none;"></video>
    <div id="vrInfo" style="display:flex;align-items:center;gap:8px;margin-top:12px;">
        <img id="vrAvatar" src="" style="width:30px;height:30px;border-radius:50%;object-fit:cover;border:2px solid #fff;">
        <span id="vrNome" style="color:#fff;font-size:13px;font-weight:600;"></span>
    </div>
    <button id="vrNext" onclick="_navVideoReview(1)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;width:38px;height:38px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
</div>
<script>
var _vrList = [], _vrIdx = 0;
function _abrirVideoReview(url, nome, avatar, idx, lista) {
    _vrList = lista; _vrIdx = idx;
    _renderVideoReview();
    var m = document.getElementById('videoReviewModal');
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function _renderVideoReview() {
    var item = _vrList[_vrIdx];
    document.getElementById('videoReviewPlayer').src = item.url;
    document.getElementById('videoReviewPlayer').play();
    document.getElementById('vrAvatar').src = item.avatar;
    document.getElementById('vrNome').textContent = item.nome;
    document.getElementById('vrPrev').style.opacity = _vrIdx > 0 ? '1' : '0.3';
    document.getElementById('vrNext').style.opacity = _vrIdx < _vrList.length - 1 ? '1' : '0.3';
}
function _navVideoReview(dir) {
    var nx = _vrIdx + dir;
    if (nx < 0 || nx >= _vrList.length) return;
    _vrIdx = nx;
    _renderVideoReview();
}
function _fecharVideoReview() {
    var p = document.getElementById('videoReviewPlayer');
    p.pause(); p.src = '';
    document.getElementById('videoReviewModal').style.display = 'none';
    document.body.style.overflow = '';
}
</script>
<!-- pixel produto -->
<script>
(async function(){
  const E='https://app.rabbtifyecom.com/app/api/track_visitor.php';
  async function resolveSlug(){
    try{const r=await fetch('loja.json',{cache:'no-store'});if(r.ok){const l=await r.json();const v=String(l?.slug||l?.nome||'').trim();if(v)return v;}}catch(e){}
    return String(window.LOJA_SLUG||window.location.hostname||'produto').trim();
  }
  const SLUG=await resolveSlug();
  fetch(E,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:SLUG,stage:'produto',url:window.location.href,ref:document.referrer||'',ua:navigator.userAgent})});
})();
</script>
</body>
<script>
    document.getElementById('save-button').addEventListener('click', function (e) {
        e.preventDefault();
        showCenterToast(t('added_to_favorites'), 'success', 1800);
    });
</script>


