from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Dict
from app.database import get_db
from app.models.translation import Translation

router = APIRouter()


def _nest_translations(translations: list) -> Dict:
    """
    Convert flat list of translations to nested dictionary structure.
    Example: key='definition.term' -> {'definition': {'term': value}}
    """
    result = {}
    for trans in translations:
        keys = trans.key.split('.')
        current = result
        for key in keys[:-1]:
            if key not in current:
                current[key] = {}
            current = current[key]
        current[keys[-1]] = trans.value
    return result


@router.get("/{locale}")
async def get_all_translations(
    locale: str,
    db: Session = Depends(get_db)
) -> Dict:
    """
    Get all translations for a specific locale.
    Returns nested dictionary organized by namespace.
    """
    translations = db.query(Translation).filter(
        Translation.locale == locale
    ).all()

    # Group by namespace
    namespaces = {}
    for trans in translations:
        if trans.namespace not in namespaces:
            namespaces[trans.namespace] = []
        namespaces[trans.namespace].append(trans)

    # Nest each namespace
    result = {}
    for namespace, trans_list in namespaces.items():
        result[namespace] = _nest_translations(trans_list)

    return result


@router.get("/{locale}/{namespace}")
async def get_namespace_translations(
    locale: str,
    namespace: str,
    db: Session = Depends(get_db)
) -> Dict:
    """
    Get all translations for a specific namespace and locale.
    Example: /translations/en/expressions
    """
    translations = db.query(Translation).filter(
        Translation.locale == locale,
        Translation.namespace == namespace
    ).all()

    return _nest_translations(translations)
